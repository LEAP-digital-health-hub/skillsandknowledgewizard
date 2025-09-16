const RESOURCES = [
  {
    id: "course-data-ethics",
    title: "Data Ethics for Research Teams",
    category: "Online training courses",
    audience: ["academic", "private"],
    description:
      "Build a responsible research data culture with practical frameworks, case studies, and toolkits you can apply immediately.",
    tags: ["data ethics", "governance", "privacy", "compliance"],
    meta: ["Self-paced · 4 weeks", "Open Data Institute"],
    link: "https://example.com/data-ethics-research",
    linkLabel: "Visit course page",
  },
  {
    id: "course-ai-health",
    title: "AI for Healthcare Outcomes",
    category: "Online training courses",
    audience: ["healthcare", "academic"],
    description:
      "Understand how to evaluate clinical AI solutions, build safe adoption roadmaps, and communicate evidence to stakeholders.",
    tags: ["ai", "clinical analytics", "health outcomes", "evaluation"],
    meta: ["Instructor-led · 6 live sessions", "Health Futures Institute"],
    link: "https://example.com/ai-for-healthcare",
    linkLabel: "View the course overview",
  },
  {
    id: "course-change-ready",
    title: "Change-Ready Innovation Foundations",
    category: "Online training courses",
    audience: ["private", "healthcare"],
    description:
      "Create resilient change strategies, measure adoption, and accelerate innovation pipelines within regulated environments.",
    tags: ["change management", "innovation", "strategy", "stakeholder engagement"],
    meta: ["On-demand · 8 modules", "Forward Labs"],
    link: "https://example.com/change-ready-innovation",
    linkLabel: "Explore the curriculum",
  },
  {
    id: "workshop-data-storytelling",
    title: "Clinical Data Storytelling Lab",
    category: "In-person workshops",
    audience: ["healthcare", "academic"],
    description:
      "Hands-on facilitation to turn complex clinical data into compelling stories that drive service improvement decisions.",
    tags: ["data storytelling", "clinical", "communication", "visualisation"],
    meta: ["In person · London & hybrid", "Next cohort: 12–13 September"],
    link: "https://example.com/clinical-data-storytelling",
    linkLabel: "Reserve your place",
  },
  {
    id: "workshop-ai-policy",
    title: "Responsible AI Policy Sprint",
    category: "In-person workshops",
    audience: ["private", "academic"],
    description:
      "Collaborate with policy specialists to build governance playbooks, assurance checklists, and risk registers for AI deployments.",
    tags: ["responsible ai", "policy", "governance", "risk management"],
    meta: ["Two-day design sprint", "Hosted quarterly in Manchester"],
    link: "https://example.com/ai-policy-sprint",
    linkLabel: "See sprint agenda",
  },
  {
    id: "workshop-change-leadership",
    title: "Transforming Care Delivery Bootcamp",
    category: "In-person workshops",
    audience: ["healthcare", "private"],
    description:
      "Co-create a transformation blueprint with systems thinkers, patient advocates, and change leaders in an immersive bootcamp.",
    tags: ["service design", "patient experience", "change leadership", "systems thinking"],
    meta: ["3-day intensive", "Rotating UK cities"],
    link: "https://example.com/care-delivery-bootcamp",
    linkLabel: "Download the bootcamp pack",
  },
  {
    id: "podcast-evidence-futures",
    title: "Evidence-Based Futures",
    category: "Podcasts",
    audience: ["academic", "healthcare"],
    description:
      "Interviews with translational researchers on applying evidence in policy, clinical, and community contexts.",
    tags: ["research translation", "policy", "impact", "leadership"],
    meta: ["Podcast · 35-minute episodes", "New every other Wednesday"],
    link: "https://example.com/evidence-based-futures",
    linkLabel: "Listen to the latest episode",
  },
  {
    id: "podcast-digital-health",
    title: "Digital Health Roundtable",
    category: "Podcasts",
    audience: ["healthcare", "private"],
    description:
      "Leaders from hospitals and startups debate digital care models, remote monitoring, and reimbursement pathways.",
    tags: ["digital health", "remote care", "reimbursement", "innovation"],
    meta: ["Podcast · 28-minute episodes", "Live Q&A each month"],
    link: "https://example.com/digital-health-roundtable",
    linkLabel: "Stream the show",
  },
  {
    id: "podcast-innovation-insider",
    title: "Innovation Insider Interviews",
    category: "Podcasts",
    audience: ["private", "academic"],
    description:
      "Stories from intrapreneurs who scaled evidence-based solutions and navigated complex stakeholder environments.",
    tags: ["innovation", "leadership", "stakeholder management", "commercialisation"],
    meta: ["Podcast · 40-minute episodes", "Seasonal mini-series"],
    link: "https://example.com/innovation-insider-interviews",
    linkLabel: "Catch up on episodes",
  },
  {
    id: "video-open-science",
    title: "Open Science Lightning Talks",
    category: "Videos",
    audience: ["academic"],
    description:
      "Short, practical case studies showcasing reproducible research workflows, preregistration, and data sharing wins.",
    tags: ["open science", "data sharing", "reproducibility", "culture"],
    meta: ["Video series · 5–8 minutes", "Recorded April 2024"],
    link: "https://example.com/open-science-talks",
    linkLabel: "Watch the series",
  },
  {
    id: "video-patient-design",
    title: "Patient-Centred Design Demos",
    category: "Videos",
    audience: ["healthcare", "private"],
    description:
      "Walk through real patient journey maps, digital prototypes, and outcome dashboards created with co-design partners.",
    tags: ["patient experience", "service design", "co-design", "journey mapping"],
    meta: ["Video playlist", "Released January 2024"],
    link: "https://example.com/patient-design-demos",
    linkLabel: "Browse the playlist",
  },
  {
    id: "video-data-products",
    title: "Scaling Data Products Masterclass",
    category: "Videos",
    audience: ["private", "academic"],
    description:
      "Master the product lifecycle for internal data platforms, from discovery to sustainable operations and measurement.",
    tags: ["data strategy", "product management", "lifecycle", "ai"],
    meta: ["Video masterclass", "Filmed with industry mentors"],
    link: "https://example.com/data-products-masterclass",
    linkLabel: "View the masterclass",
  },
];

const audienceLabels = {
  academic: "academics and researchers",
  healthcare: "healthcare professionals",
  private: "people working in private companies",
};

const fallbackTopics = [
  "responsible AI",
  "patient experience",
  "data governance",
  "innovation strategy",
];

const categoryOrder = [
  "Online training courses",
  "In-person workshops",
  "Podcasts",
  "Videos",
];

const form = document.getElementById("wizard-form");
const resultsList = document.getElementById("results-list");
const resultsSummary = document.getElementById("results-summary");

let hasSearched = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hasSearched = true;
  performSearch();
});

form.addEventListener("input", () => {
  if (hasSearched) {
    performSearch();
  }
});

function performSearch() {
  const formData = new FormData(form);
  const audience = formData.get("audience");
  const interest = (formData.get("interest") || "").trim();

  if (!audience) {
    resultsSummary.textContent =
      "Select your background to start exploring tailored recommendations.";
    resultsList.innerHTML = "";
    return;
  }

  const matches = filterResources(audience, interest);
  renderResults(matches, { audience, interest });
}

function filterResources(audience, interest) {
  const interestTokens = (interest || "")
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(Boolean);

  return RESOURCES.filter((resource) => {
    if (!resource.audience.includes(audience)) {
      return false;
    }

    if (!interestTokens.length) {
      return true;
    }

    const haystack = [
      resource.title,
      resource.description,
      resource.category,
      ...(resource.tags || []),
      ...(resource.meta || []),
    ]
      .join(" ")
      .toLowerCase();

    return interestTokens.every((token) => haystack.includes(token));
  });
}

function renderResults(results, context) {
  const { audience, interest } = context;
  const friendlyAudience = audienceLabels[audience] || "learners";
  const pluralised = results.length === 1 ? "match" : "matches";

  if (!results.length) {
    if (interest) {
      resultsSummary.textContent = `We couldn't find any ${pluralised} for ${friendlyAudience} interested in “${interest}”.`;
    } else {
      resultsSummary.textContent = `We couldn't find any matches for ${friendlyAudience}.`;
    }

    resultsList.innerHTML = "";
    const message = document.createElement("p");
    message.className = "no-results";
    const suggestions = fallbackTopics.map((topic) => `“${topic}”`).join(", ");
    message.textContent = `Try another keyword such as ${suggestions}, or clear the topic box to view all recommendations for your background.`;
    resultsList.appendChild(message);
    return;
  }

  if (interest) {
    resultsSummary.textContent = `Showing ${results.length} ${pluralised} for ${friendlyAudience} interested in “${interest}”.`;
  } else {
    resultsSummary.textContent = `Showing ${results.length} ${pluralised} for ${friendlyAudience}. Add a topic to narrow the recommendations.`;
  }

  const grouped = groupByCategory(results);
  resultsList.innerHTML = "";

  grouped.forEach(([category, items]) => {
    const group = document.createElement("div");
    group.className = "result-group";

    const heading = document.createElement("h3");
    heading.textContent = category;
    group.appendChild(heading);

    items.forEach((resource) => {
      const article = document.createElement("article");
      article.className = "resource-card";

      const title = document.createElement("h4");
      title.textContent = resource.title;
      article.appendChild(title);

      if (resource.description) {
        const description = document.createElement("p");
        description.textContent = resource.description;
        article.appendChild(description);
      }

      if (resource.meta?.length) {
        const meta = document.createElement("div");
        meta.className = "resource-meta";
        resource.meta.forEach((item) => {
          const pill = document.createElement("span");
          pill.className = "meta-pill";
          pill.textContent = item;
          meta.appendChild(pill);
        });
        article.appendChild(meta);
      }

      if (resource.tags?.length) {
        const tags = document.createElement("div");
        tags.className = "tag-list";
        resource.tags.forEach((tag) => {
          const tagEl = document.createElement("span");
          tagEl.className = "tag";
          tagEl.textContent = tag;
          tags.appendChild(tagEl);
        });
        article.appendChild(tags);
      }

      if (resource.link) {
        const link = document.createElement("a");
        link.className = "resource-link";
        link.href = resource.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = resource.linkLabel || "Open resource";
        article.appendChild(link);
      }

      group.appendChild(article);
    });

    resultsList.appendChild(group);
  });
}

function groupByCategory(items) {
  const grouped = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc.has(category)) {
      acc.set(category, []);
    }
    acc.get(category).push(item);
    return acc;
  }, new Map());

  return Array.from(grouped.entries())
    .sort((a, b) => getCategoryIndex(a[0]) - getCategoryIndex(b[0]))
    .map(([category, resources]) => [category, resources.sort((a, b) => a.title.localeCompare(b.title))]);
}

function getCategoryIndex(category) {
  const index = categoryOrder.indexOf(category);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
