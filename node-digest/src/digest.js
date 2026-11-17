const OpenAI = require("openai");
const { projects, taskEvents } = require("./db");

const MODEL = process.env.DIGEST_MODEL || "gpt-4o-mini";
let client;

function openai() {
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

function weekFor(projectId) {
  return taskEvents.filter((e) => e.projectId === projectId);
}

function buildPrompt(project, events) {
  const lines = events.map((e) => `- ${e.at}: "${e.task}" ${e.change} (${e.by})`);
  return [
    `Write a short weekly digest for the "${project.name}" project.`,
    "Three bullet points at most: what got done, what is in progress, anything blocked.",
    "",
    "This week's changes:",
    ...(lines.length ? lines : ["- No changes this week."]),
  ].join("\n");
}

async function digestFor(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;
  const events = weekFor(projectId);
  const response = await openai().chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: "You write concise, friendly project updates for busy teams." },
      { role: "user", content: buildPrompt(project, events) },
    ],
    temperature: 0.3,
  });
  return { projectId, summary: response.choices[0].message.content, events: events.length };
}

module.exports = { digestFor, buildPrompt, weekFor };
