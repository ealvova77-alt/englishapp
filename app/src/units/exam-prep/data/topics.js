// IELTS / TOEFL Exam Preparation Topics
// Each topic has sections with questions of different types:
//   - "choice"  — multiple choice (4 options)
//   - "fill"    — fill in the blank (type answer)

export const TOPICS = [
  {
    id: "academic-vocab",
    title: "Academic Vocabulary",
    description: "Essential words for IELTS/TOEFL essays and reading",
    emoji: "🎓",
    sections: [
      {
        id: "synonyms",
        title: "Synonyms & Paraphrasing",
        questions: [
          {
            type: "choice",
            question: 'Choose the best synonym for "significant":',
            options: ["important", "small", "quick", "simple"],
            answer: 0,
            explanation: '"Significant" means important or notable.',
          },
          {
            type: "choice",
            question: 'Which word is closest in meaning to "demonstrate"?',
            options: ["destroy", "show", "delay", "demand"],
            answer: 1,
            explanation: '"Demonstrate" means to show or prove something.',
          },
          {
            type: "choice",
            question: '"Enhance" is closest in meaning to:',
            options: ["reduce", "improve", "change", "remove"],
            answer: 1,
            explanation: '"Enhance" means to improve the quality or value of something.',
          },
          {
            type: "choice",
            question: 'Choose the synonym for "subsequent":',
            options: ["previous", "following", "similar", "sudden"],
            answer: 1,
            explanation: '"Subsequent" means coming after something in time.',
          },
          {
            type: "choice",
            question: '"Adequate" means:',
            options: ["excessive", "insufficient", "sufficient", "perfect"],
            answer: 2,
            explanation: '"Adequate" means enough or satisfactory.',
          },
          {
            type: "choice",
            question: 'The word "furthermore" can be replaced by:',
            options: ["however", "moreover", "therefore", "instead"],
            answer: 1,
            explanation: '"Furthermore" and "moreover" both add supporting information.',
          },
          {
            type: "choice",
            question: '"Comprise" is closest in meaning to:',
            options: ["exclude", "compare", "consist of", "compete"],
            answer: 2,
            explanation: '"Comprise" means to consist of or be made up of.',
          },
          {
            type: "choice",
            question: 'Choose the synonym for "inevitable":',
            options: ["avoidable", "uncertain", "unavoidable", "invisible"],
            answer: 2,
            explanation: '"Inevitable" means certain to happen, unavoidable.',
          },
          {
            type: "fill",
            question: 'Complete: "The results were _____ to the previous study." (similar)',
            answer: "analogous",
            accept: ["analogous", "comparable", "similar"],
            explanation: '"Analogous" means comparable or similar in certain respects.',
          },
          {
            type: "fill",
            question: 'The noun form of "significant" is:',
            answer: "significance",
            accept: ["significance"],
            explanation: '"Significant" (adj) → "significance" (noun).',
          },
        ],
      },
      {
        id: "linking-words",
        title: "Linking Words & Connectors",
        questions: [
          {
            type: "choice",
            question: "Which word introduces a contrast?",
            options: ["Moreover", "Nevertheless", "Furthermore", "Additionally"],
            answer: 1,
            explanation: '"Nevertheless" introduces a contrast or concession.',
          },
          {
            type: "choice",
            question: '"_____, the study found no correlation." Choose the best option:',
            options: ["In addition", "For example", "Consequently", "Surprisingly"],
            answer: 3,
            explanation: '"Surprisingly" introduces an unexpected result.',
          },
          {
            type: "choice",
            question: 'Which phrase is used to give an example?',
            options: ["On the other hand", "For instance", "As a result", "In conclusion"],
            answer: 1,
            explanation: '"For instance" is used to introduce an example.',
          },
          {
            type: "choice",
            question: '"The economy grew. _____, unemployment decreased."',
            options: ["However", "Consequently", "Although", "Despite"],
            answer: 1,
            explanation: '"Consequently" shows cause and effect.',
          },
          {
            type: "fill",
            question: '"_____ the rain, the event continued." (despite)',
            answer: "Despite",
            accept: ["Despite", "despite", "In spite of", "in spite of"],
            explanation: '"Despite" + noun shows contrast.',
          },
          {
            type: "fill",
            question: '"He studied hard; _____, he passed the exam." (therefore)',
            answer: "therefore",
            accept: ["therefore", "consequently", "thus", "hence"],
            explanation: '"Therefore" introduces a logical result.',
          },
          {
            type: "choice",
            question: '"Not only did production increase, _____ quality improved."',
            options: ["but also", "however", "despite", "although"],
            answer: 0,
            explanation: '"Not only... but also" links two positive facts.',
          },
          {
            type: "choice",
            question: 'Which connector means "in contrast"?',
            options: ["Likewise", "Similarly", "Conversely", "Moreover"],
            answer: 2,
            explanation: '"Conversely" introduces an opposite point.',
          },
          {
            type: "choice",
            question: '"_____ his lack of experience, he performed well."',
            options: ["Because of", "Due to", "In spite of", "As a result of"],
            answer: 2,
            explanation: '"In spite of" shows unexpected contrast.',
          },
          {
            type: "fill",
            question: '"To _____ up, the evidence supports the theory." (sum)',
            answer: "sum",
            accept: ["sum"],
            explanation: '"To sum up" is used to conclude or summarize.',
          },
        ],
      },
      {
        id: "word-formation",
        title: "Word Formation",
        questions: [
          {
            type: "fill",
            question: 'The adjective form of "economy" is:',
            answer: "economic",
            accept: ["economic", "economical"],
            explanation: '"Economic" relates to the economy; "economical" means cost-effective.',
          },
          {
            type: "fill",
            question: 'The noun form of "analyze" is:',
            answer: "analysis",
            accept: ["analysis"],
            explanation: '"Analyze" (verb) → "analysis" (noun).',
          },
          {
            type: "fill",
            question: 'The adverb form of "considerable" is:',
            answer: "considerably",
            accept: ["considerably"],
            explanation: '"Considerable" (adj) → "considerably" (adv).',
          },
          {
            type: "fill",
            question: 'The verb form of "conclusion" is:',
            answer: "conclude",
            accept: ["conclude"],
            explanation: '"Conclusion" (noun) → "conclude" (verb).',
          },
          {
            type: "fill",
            question: 'The opposite of "logical" using a prefix is:',
            answer: "illogical",
            accept: ["illogical"],
            explanation: 'The prefix "il-" negates "logical".',
          },
          {
            type: "choice",
            question: 'Which is the correct noun form of "respond"?',
            options: ["respondent", "response", "responsible", "responsive"],
            answer: 1,
            explanation: '"Response" is the noun form of "respond".',
          },
          {
            type: "choice",
            question: '"Develop" → noun:',
            options: ["developable", "developing", "development", "developer"],
            answer: 2,
            explanation: '"Development" is the process noun of "develop".',
          },
          {
            type: "fill",
            question: 'Make the adjective: "access" + suffix = _____',
            answer: "accessible",
            accept: ["accessible"],
            explanation: '"Access" + "-ible" = "accessible".',
          },
          {
            type: "fill",
            question: 'The noun form of "diverse" is:',
            answer: "diversity",
            accept: ["diversity", "diversification"],
            explanation: '"Diverse" (adj) → "diversity" (noun).',
          },
          {
            type: "choice",
            question: 'Which is the adjective form of "benefit"?',
            options: ["benefiting", "beneficial", "beneficially", "beneficiary"],
            answer: 1,
            explanation: '"Beneficial" is the adjective meaning "advantageous".',
          },
        ],
      },
    ],
  },
  {
    id: "reading-skills",
    title: "Reading Comprehension",
    description: "Practice key reading strategies for exam passages",
    emoji: "📖",
    sections: [
      {
        id: "true-false",
        title: "True / False / Not Given",
        questions: [
          {
            type: "choice",
            question:
              'Passage: "Global temperatures have risen by 1.1°C since pre-industrial times."\n\nStatement: "Temperatures increased by more than 2°C."',
            options: ["True", "False", "Not Given"],
            answer: 1,
            explanation: "The passage says 1.1°C, not more than 2°C — this is False.",
          },
          {
            type: "choice",
            question:
              'Passage: "The study involved 500 participants from three countries."\n\nStatement: "Most participants were from Europe."',
            options: ["True", "False", "Not Given"],
            answer: 2,
            explanation: "The passage doesn't mention where participants were from — Not Given.",
          },
          {
            type: "choice",
            question:
              'Passage: "Renewable energy sources now account for 30% of global electricity production."\n\nStatement: "Less than half of electricity comes from renewables."',
            options: ["True", "False", "Not Given"],
            answer: 0,
            explanation: "30% is less than half (50%), so the statement is True.",
          },
          {
            type: "choice",
            question:
              'Passage: "The university was founded in 1850 and has expanded significantly since then."\n\nStatement: "The university was founded in the 18th century."',
            options: ["True", "False", "Not Given"],
            answer: 1,
            explanation: "1850 is the 19th century, not the 18th — this is False.",
          },
          {
            type: "choice",
            question:
              'Passage: "Coffee consumption has been linked to improved cognitive function in several studies."\n\nStatement: "Drinking coffee prevents Alzheimer\'s disease."',
            options: ["True", "False", "Not Given"],
            answer: 2,
            explanation: "The passage mentions cognitive function but not Alzheimer's — Not Given.",
          },
          {
            type: "choice",
            question:
              'Passage: "The city\'s population doubled between 2000 and 2020, reaching 4 million."\n\nStatement: "The city had 2 million residents in 2000."',
            options: ["True", "False", "Not Given"],
            answer: 0,
            explanation: "If it doubled to 4 million, it was 2 million in 2000 — True.",
          },
          {
            type: "choice",
            question:
              'Passage: "The experiment was conducted under controlled laboratory conditions."\n\nStatement: "The experiment took place outdoors."',
            options: ["True", "False", "Not Given"],
            answer: 1,
            explanation: "Laboratory conditions means indoors, not outdoors — False.",
          },
          {
            type: "choice",
            question:
              'Passage: "Bilingual children often outperform monolingual peers in problem-solving tasks."\n\nStatement: "Bilingual children learn to read faster."',
            options: ["True", "False", "Not Given"],
            answer: 2,
            explanation: "The passage discusses problem-solving, not reading speed — Not Given.",
          },
        ],
      },
      {
        id: "main-idea",
        title: "Identifying Main Ideas",
        questions: [
          {
            type: "choice",
            question:
              '"While social media has connected people globally, studies show it may increase feelings of isolation and anxiety, particularly among young adults who spend more than three hours daily on platforms."\n\nWhat is the main idea?',
            options: [
              "Social media is popular among young adults",
              "Social media connects people but may harm mental health",
              "Young adults spend too much time online",
              "Studies about social media are unreliable",
            ],
            answer: 1,
            explanation: "The passage contrasts connection with negative mental health effects.",
          },
          {
            type: "choice",
            question:
              '"Urban farming is emerging as a solution to food security in cities. Rooftop gardens and vertical farms can produce fresh vegetables year-round, reducing transportation costs and carbon emissions."\n\nThe main purpose of this passage is to:',
            options: [
              "Criticize traditional farming",
              "Explain the benefits of urban farming",
              "Discuss carbon emissions",
              "Promote rooftop gardens",
            ],
            answer: 1,
            explanation: "The passage presents urban farming as a beneficial solution.",
          },
          {
            type: "choice",
            question:
              '"The decline of bee populations threatens global food production. Approximately 75% of food crops depend on pollinators, and without intervention, crop yields could decrease dramatically within a decade."\n\nWhat is the author\'s main concern?',
            options: [
              "Honey production is declining",
              "Bees are endangered species",
              "Declining bee populations threaten food supply",
              "Farming methods need to change",
            ],
            answer: 2,
            explanation: "The main concern is the link between bee decline and food production.",
          },
          {
            type: "choice",
            question:
              '"Remote work has transformed the modern workplace. Companies report increased productivity, while employees enjoy better work-life balance. However, challenges remain in maintaining team cohesion and company culture."\n\nThe passage presents remote work as:',
            options: [
              "Entirely positive",
              "Mostly negative",
              "Having both benefits and challenges",
              "A temporary trend",
            ],
            answer: 2,
            explanation: 'The passage presents both pros ("increased productivity") and cons ("challenges remain").',
          },
        ],
      },
    ],
  },
  {
    id: "essay-writing",
    title: "Essay Structure",
    description: "Key phrases and structures for IELTS/TOEFL essays",
    emoji: "✍️",
    sections: [
      {
        id: "intro-phrases",
        title: "Introduction Phrases",
        questions: [
          {
            type: "choice",
            question: "Which is the best way to start an IELTS essay introduction?",
            options: [
              '"In today\'s world..."',
              '"I think that..."',
              '"It is widely debated whether..."',
              '"Hello, in this essay..."',
            ],
            answer: 2,
            explanation: "Academic essays should start with a general statement, not personal or informal.",
          },
          {
            type: "fill",
            question: '"This essay will _____ both sides of the argument." (examine)',
            answer: "examine",
            accept: ["examine", "discuss", "explore", "analyze", "analyse", "consider"],
            explanation: "Academic verbs like examine, discuss, explore are appropriate for thesis statements.",
          },
          {
            type: "choice",
            question: "Which thesis statement is most appropriate for an IELTS Task 2 essay?",
            options: [
              '"I totally agree with this."',
              '"This essay will examine the advantages and disadvantages of this trend."',
              '"Everyone knows this is true."',
              '"Let me tell you what I think."',
            ],
            answer: 1,
            explanation: "A good thesis outlines the essay structure clearly and formally.",
          },
          {
            type: "choice",
            question: 'What does "paraphrase the question" mean in essay writing?',
            options: [
              "Copy the question exactly",
              "Ignore the question",
              "Restate the question in your own words",
              "Answer the question immediately",
            ],
            answer: 2,
            explanation: "Paraphrasing means expressing the same idea using different words.",
          },
          {
            type: "fill",
            question: '"There is a growing _____ that education should be free." (belief/trend)',
            answer: "consensus",
            accept: ["consensus", "belief", "trend", "tendency", "perception"],
            explanation: '"There is a growing consensus/belief that..." is a common academic opening.',
          },
        ],
      },
      {
        id: "body-arguments",
        title: "Body Paragraphs & Arguments",
        questions: [
          {
            type: "choice",
            question: "What should a body paragraph start with?",
            options: [
              "An example",
              "A conclusion",
              "A topic sentence",
              "A personal story",
            ],
            answer: 2,
            explanation: "Body paragraphs should begin with a clear topic sentence stating the main point.",
          },
          {
            type: "choice",
            question: 'Which phrase best introduces supporting evidence?',
            options: [
              '"I believe..."',
              '"For example, a study by..."',
              '"Obviously..."',
              '"Everyone agrees..."',
            ],
            answer: 1,
            explanation: "Citing studies or examples provides concrete evidence for your argument.",
          },
          {
            type: "fill",
            question: '"One _____ argument in favour of this is..." (strong/compelling)',
            answer: "compelling",
            accept: ["compelling", "strong", "convincing", "persuasive", "key", "major"],
            explanation: '"One compelling argument" is a formal way to introduce a point.',
          },
          {
            type: "choice",
            question: "How should you structure a body paragraph?",
            options: [
              "Example → Topic → Explanation",
              "Topic sentence → Explanation → Example → Link",
              "Conclusion → Example → Topic",
              "Question → Answer → Question",
            ],
            answer: 1,
            explanation: "TEEL structure: Topic, Explanation, Example, Link back to thesis.",
          },
          {
            type: "fill",
            question: '"This _____ is supported by research from Harvard University." (claim/view)',
            answer: "claim",
            accept: ["claim", "view", "argument", "position", "finding", "assertion"],
            explanation: "Academic writing uses precise nouns like claim, view, argument to refer to ideas.",
          },
        ],
      },
      {
        id: "conclusion-phrases",
        title: "Conclusion Phrases",
        questions: [
          {
            type: "choice",
            question: "Which is the best way to begin a conclusion?",
            options: [
              '"To conclude..."',
              '"In conclusion, this essay has examined..."',
              '"That\'s all I have to say."',
              '"Finally, I want to say..."',
            ],
            answer: 1,
            explanation: '"In conclusion" + summary of what was discussed is the standard academic approach.',
          },
          {
            type: "fill",
            question: '"On _____, the benefits outweigh the drawbacks." (balance)',
            answer: "balance",
            accept: ["balance"],
            explanation: '"On balance" means "considering everything".',
          },
          {
            type: "choice",
            question: "What should a strong conclusion do?",
            options: [
              "Introduce new arguments",
              "Summarize main points and restate your position",
              "Ask the reader a question",
              "Copy the introduction",
            ],
            answer: 1,
            explanation: "A conclusion summarizes and reinforces — it should not add new ideas.",
          },
          {
            type: "fill",
            question: '"Taking everything into _____, I believe..." (consideration/account)',
            answer: "consideration",
            accept: ["consideration", "account"],
            explanation: '"Taking everything into consideration/account" is a formal conclusion opener.',
          },
          {
            type: "choice",
            question: 'Which phrase is best for giving a balanced final opinion?',
            options: [
              '"I strongly disagree with everything."',
              '"While there are merits to both sides, I believe..."',
              '"It\'s obvious that..."',
              '"Nobody can deny..."',
            ],
            answer: 1,
            explanation: "Acknowledging both sides before stating your view shows balanced thinking.",
          },
        ],
      },
    ],
  },
];
