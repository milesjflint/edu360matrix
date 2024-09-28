

// PERSONA PAGE 
// Function to check persona selection and enable/disable the continue button
function checkPersonaSelection() {
    var persona = document.getElementById("persona-select").value;
    var continueButton = document.getElementById("continue-button");

    if (persona !== "") {
        continueButton.disabled = false; // Enable button if a persona is selected
    } else {
        continueButton.disabled = true;  // Keep button disabled if no persona is selected
    }
}

// Function to navigate to the next page (e.g., CriteronPage.html)
function goToNextPage() {
    window.location.href = 'CriteronPage.html';
}

// CRITERION PAGE

// Define the weights for each persona
var weights = {
  "Primary Students": [5, 4, 5, 5, 5, 3, 5, 3, 3, 2, 2, 3, 1, 3, 1, 3],
  Parents: [5, 4, 5, 5, 5, 3, 5, 3, 4, 3, 5, 3, 2, 4, 2, 3],
  "Secondary Students": [5, 5, 5, 5, 5, 4, 5, 4, 4, 4, 4, 4, 2, 4, 2, 4],
  "Secondary Teachers": [5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4],
  "Primary Teachers": [5, 5, 5, 4, 5, 3, 4, 3, 4, 3, 5, 4, 5, 4, 3, 4],
  "Tertiary Students": [5, 4, 5, 5, 5, 4, 4, 4, 4, 4, 5, 4, 2, 4, 3, 4],
  "University Lecturers": [5, 4, 5, 4, 5, 4, 3, 3, 4, 4, 5, 4, 5, 4, 5, 4],
  Administrators: [5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 5, 4, 4, 5, 5, 5],
}

var selectedWeights = weights["Primary Students"] // Default to Primary Students persona

// Define the criteria and their stage descriptions
var criteria = [
  {
    name: "Educational Effectiveness (EE)",
    descriptions: [
      "1 - Potential impact is speculative; benefits are unclear. No empirical data to support educational effectiveness.",
      "2 - Explore possibilities; pilot programs to test effectiveness. Collect initial feedback and observations.",
      "3 - Recognize potential benefits; implement in limited settings. Begin to see positive outcomes in educational contexts.",
      "4 - Require evidence of positive impact; data-driven adoption. Rely on studies and success stories demonstrating effectiveness.",
      "5 - Need widespread proof of effectiveness; follow established success stories. Adoption driven by proven track records in similar settings.",
      "6 - Effectiveness is established; technology is integrated into standard practices. Focus shifts to optimization and maximizing benefits.",
    ],
    fullDescription: "Educational Effectiveness refers to how well the technology improves learning outcomes and enhances the overall educational experience."
  },
  {
    name: "Curriculum Alignment (CUA)",
    descriptions: [
      "1 - Alignment with curriculum is unclear; not considered in planning. Technology is too new to have established educational frameworks.",
      "2 - Adapt curriculum to incorporate technology; develop new lesson plans. Innovators create pioneering approaches to integration.",
      "3 - Modify curriculum; align with emerging standards; pilot integrations. Begin to see official resources and guidelines for curriculum integration.",
      "4 - Require official curriculum guidelines; expect alignment with educational standards. Adoption depends on formal recognition and support from educational authorities.",
      "5 - Demand full curriculum integration; technology must fit seamlessly within existing frameworks. Resistance to significant curriculum changes.",
      "6 - Curriculum fully integrates technology; standards and guidelines are established. Technology use is expected or mandated in educational programs.",
    ],
    fullDescription: "Curriculum Alignment measures how well the technology integrates with and supports the existing academic curriculum and educational standards."

  },
  {
    name: "Student Engagement and Outcomes (SEO)",
    descriptions: [
      "1 - Engagement potential is unknown; no data available. Unclear how technology affects student motivation and outcomes.",
      "2 - Experiment with engagement strategies; observe initial reactions. Collect anecdotal evidence of increased engagement.",
      "3 - Early signs of increased engagement and improved outcomes; collect preliminary data. Begin to understand how technology influences learning processes.",
      "4 - Require evidence of improved outcomes; adopt based on positive results. Studies show significant improvements in engagement and achievement.",
      "5 - Need substantial proof of benefits; rely on extensive research and peer experiences. Adoption driven by consensus on positive impact on students.",
      "6 - High engagement levels; outcomes are optimized; technology becomes integral to student success. Focus on sustaining and enhancing engagement strategies.",
    ],
    fullDescription: "Student Engagement and Outcomes assess the technology's impact on student motivation, participation, and their learning results."

  },
  {
    name: "Personalization and Adaptive Learning (PAL)",
    descriptions: [
      "1 - Technology lacks personalization capabilities; learning experiences are uniform. No adaptive features implemented.",
      "2 - Experiment with adaptive features; customize solutions. Develop initial personalized learning paths.",
      "3 - Implement basic personalization; observe effects; collect data on adaptive learning impacts. Adjust approaches based on feedback.",
      "4 - Require evidence of improved learning through personalization; integrate advanced adaptive learning features. Personalization becomes a key component of the learning strategy.",
      "5 - Accept standardized personalization; expect consistent results; technology offers default adaptive features. Personalization is widely accepted but not customized beyond standard offerings.",
      "6 - Personalization is integral to education; systems provide highly customized learning paths. Continuous improvement based on data analytics and student feedback.",
    ],
    fullDescription: "Personalization and Adaptive Learning measure the technology’s ability to tailor educational experiences to individual student needs, preferences, and performance levels."

  },
  {
    name: "Accessibility (ACC)",
    descriptions: [
      "1 - Limited accessibility; high barriers to entry. Technology is not widely available; may be cost-prohibitive.",
      "2 - Accessibility improves slightly; early adopters invest despite barriers. Efforts to increase availability begin.",
      "3 - Wider accessibility; costs begin to decrease; technology becomes more attainable. Institutions start to provide access to select groups.",
      "4 - Technology becomes affordable; widespread access is achieved. Barriers to entry are significantly reduced; infrastructure is in place to support accessibility.",
      "5 - Accessibility maximized; technology is ubiquitous; nearly all users can access it easily. Focus shifts to ensuring equitable access across all demographics.",
      "6 - Accessibility plateaus; technology is fully integrated into society. Efforts focus on maintaining and upgrading access.",
    ],
    fullDescription: "Accessibility evaluates how easily the technology can be used by students, teachers, and other stakeholders, including considerations for cost and ease of access."

  },
  {
    name: "Technology Literacy Requirements (TLR)",
    descriptions: [
      "1 - High literacy requirements; steep learning curve. Users need specialized skills to operate the technology effectively.",
      "2 - Early adopters develop necessary skills; share knowledge within communities. Training materials are scarce but emerging.",
      "3 - Training becomes available; literacy barriers begin to reduce. Institutions offer professional development and support.",
      "4 - Technology becomes more user-friendly; literacy requirements are minimal. User interfaces improve; tutorials and resources are widely available.",
      "5 - Majority of users are comfortable with technology; ease of use is high. Technology is intuitive; minimal training required.",
      "6 - Literacy widespread; technology use is second nature to most users. Digital literacy programs focus on advanced features and optimization.",
    ],
    fullDescription: "Technology Literacy Requirements gauge the level of technical skills and knowledge necessary for users to effectively engage with the technology."

  },
  {
    name: "Financial Considerations (FIN)",
    descriptions: [
      "1 - High costs; uncertain return on investment (ROI); financial barriers prevent consideration. Funding is scarce; technology is seen as risky.",
      "2 - Invest despite high costs; expect long-term benefits; seek funding through grants or partnerships. Early investors accept higher risks.",
      "3 - Require justification for expenses; evaluate potential cost savings and ROI; may pilot projects to demonstrate financial viability. Budget allocations begin to include the technology.",
      "4 - Need clear evidence of cost-effectiveness; budgets are allocated accordingly. Financial benefits are documented; cost becomes less of a barrier.",
      "5 - Demand high ROI; prefer low-cost or existing solutions; reluctant to invest unless costs are low and benefits are clear. Adoption is driven by affordability.",
      "6 - Costs have stabilized; ROI is established; technology is considered cost-effective. Budgets include ongoing maintenance and support costs.",
    ],
    fullDescription: "Financial Considerations explore the costs of implementing and maintaining the technology, as well as its potential return on investment (ROI) and overall affordability."

  },
  {
    name: "Scalability and Economies of Scale (SES)",
    descriptions: [
      "1 - Scalability untested; costs are high; production is limited. Technology is not yet designed for large-scale deployment.",
      "2 - Begin scaling; costs start to decrease slightly; explore methods to improve scalability. Production processes are refined.",
      "3 - Scaling improves; economies of scale reduce prices; technology becomes more accessible. Manufacturing and distribution expand.",
      "4 - Full scalability achieved; costs are significantly reduced; technology is widely available. Mass production leads to affordability.",
      "5 - Costs stabilized; economies of scale are maximized; focus on efficiency. Technology is produced at optimal scale; market is saturated.",
      "6 - Scaling reaches peak efficiency; no significant cost reductions. Organizations focus on maintaining production levels.",
    ],
    fullDescription: "Scalability and Economies of Scale assess the technology’s ability to expand its use efficiently across a larger group or institution without significant increases in cost."

  },
  {
    name: "Technological Readiness (TR)",
    descriptions: [
      "1 - Infrastructure is inadequate; skills are lacking; unprepared for new technology. Organizations and users are unaware or unable to support the technology.",
      "2 - Build necessary infrastructure; develop skills; invest in readiness initiatives. Early adopters address technological gaps proactively.",
      "3 - Assess readiness; begin upgrades; implement training programs to enhance competencies. Infrastructure improvements are underway.",
      "4 - Infrastructure meets basic needs; ongoing improvements; users have baseline competencies. Technology can be deployed with minimal issues.",
      "5 - Technological infrastructure is mature; users are competent; focus on optimization and efficiency. Support systems are well-established.",
      "6 - Readiness is standardized and maintained; supports seamless integration of future technologies. Organizations are fully equipped to handle technological demands.",
    ],
    fullDescription: "Technological Readiness refers to the infrastructure, resources, and technical skills available to support the effective deployment and use of the technology."


  },
  {
    name: "Standardization and Compatibility (SC)",
    descriptions: [
      "1 - Standards are undeveloped; compatibility is uncertain; risk of incompatibility with existing systems. Lack of industry consensus on protocols and specifications.",
      "2 - Experiment with standards; may influence development; work around compatibility issues creatively. Participate in establishing initial standards.",
      "3 - Prefer emerging standards; cautious about compatibility issues; advocate for standardization efforts. Begin to adopt technologies that adhere to agreed-upon protocols.",
      "4 - Adopt technologies with established standards; expect compatibility with existing systems and platforms. Integration becomes smoother; industry standards are widely accepted.",
      "5 - Require full standardization and compatibility; unwilling to deal with integration challenges; expect plug-and-play solutions. Technology must seamlessly integrate with current systems.",
      "6 - Standards are established; compatibility is ensured; technologies integrate seamlessly across platforms and systems. Organizations rely on standardized practices.",
    ],
    fullDescription: "Standardization and Compatibility evaluate whether the technology adheres to established industry standards and is compatible with existing tools, platforms, and systems."

  },
  {
    name: "Ethical and Data Considerations (EDC)",
    descriptions: [
      "1 - Ethical implications and data security are uncertain; no policies in place; potential risks unaddressed. Organizations may be unaware of potential ethical issues.",
      "2 - Address ethical issues proactively; establish basic data security protocols; develop initial guidelines for ethical use. Begin discussions on ethical best practices.",
      "3 - Implement safeguards; comply with emerging regulations; provide training on ethics and data handling. Policies are formalized; staff are educated on compliance requirements.",
      "4 - Require robust policies and guidelines to address ethical issues; ensure compliance with regulations and ethical standards; regular audits are conducted. Organizations prioritize ethical considerations.",
      "5 - Demand full compliance with ethical standards; expect comprehensive policies and oversight mechanisms; minimal tolerance for risks. Ethics become a key factor in adoption decisions.",
      "6 - Ethical standards and data security are integral; compliance is mandatory; ongoing monitoring and updates to ethical practices are routine. Organizations have dedicated ethics committees or officers.",
    ],
    fullDescription: "Ethical and Data Considerations focus on the privacy, security, and ethical implications of using the technology, including how data is collected, stored, and used."

  },
  {
    name: "Ecosystem Support and Network Effects (ES)",
    descriptions: [
      "1 - Ecosystem is undeveloped; minimal network effects; limited resources and support. Few users and developers are engaged; limited content or applications available.",
      "2 - Navigate different platforms; may develop solutions; contribute to ecosystem growth. Early community forms around the technology.",
      "3 - Choose platforms with perceived longevity; consider ecosystem stability. More resources become available; third-party support increases.",
      "4 - Adopt platforms with established ecosystems; expect robust support and resources. Network effects amplify as more users adopt the technology.",
      "5 - Require mature ecosystems; broad support; rely on proven network effects. Extensive resources, applications, and community support are available.",
      "6 - Ecosystem is robust; network effects are strong; wide range of resources available. Ecosystem growth stabilizes; focus shifts to maintenance and quality improvements.",
    ],
    fullDescription: "Ecosystem Support and Network Effects examine the external support systems, community engagement, and collaboration opportunities that enhance the technology's effectiveness."

  },
  {
    name: "Professional Development Needs (PD)",
    descriptions: [
      "1 - Training requirements are unknown; lack of available resources. Users are unaware of skills needed; no training programs exist.",
      "2 - Willing to learn independently; share knowledge with peers; develop training materials. Self-directed learning and peer support are common.",
      "3 - Require initial training and support; participate in early professional development programs. Organizations begin to offer training sessions and resources.",
      "4 - Need structured professional development programs; expect institutional support for training. Training becomes formalized; certifications may be offered.",
      "5 - Prefer minimal training; seek simple integration; rely on established practices. Training focuses on basic usage and is often mandatory.",
      "6 - Training is standardized and widely available; professional development is integrated into regular practices. Ongoing training focuses on advanced features and optimization.",
    ],
    fullDescription: "Professional Development Needs consider the training and continuous learning required for teachers, administrators, and students to effectively use the technology."
  },
  {
    name: "Facilitating Conditions (FAC)",
    descriptions: [
      "1 - Infrastructure and support are undeveloped; lack of necessary resources hinders adoption. Organizations lack the facilities or support services needed.",
      "2 - Create or seek enabling environments; invest in infrastructure; develop support mechanisms. Early adopters address facilitating conditions proactively.",
      "3 - Require some support and infrastructure; begin establishing necessary conditions for broader adoption. Investments are made in facilities and support staff.",
      "4 - Support systems are established; expect reliability and maintenance. Organizations have dedicated teams for support and troubleshooting.",
      "5 - Depend on mature infrastructure; require seamless integration and minimal disruption to existing systems. High expectations for support quality and availability.",
      "6 - Support is standardized and widely available; infrastructure is robust; facilitating conditions are well-maintained. Continuous improvements are made to support services.",
    ],
      fullDescription: "Facilitating Conditions assess the external resources, technical support, and organizational infrastructure necessary to enable successful use of the technology."

  },
  {
    name: "Strategic Partnerships and Industry Support (SP)",
    descriptions: [
      "1 - Partnerships are minimal; support is uncertain; limited collaboration with industry. Technology lacks endorsement from major players.",
      "2 - Collaborate with industry leaders; form alliances; contribute to development and innovation. Partnerships help advance the technology.",
      "3 - Seek partnerships to enhance adoption; leverage industry support for resources and expertise. Industry begins to recognize the technology's potential.",
      "4 - Prefer technologies with established industry backing and support; partnerships add credibility. Endorsements from reputable organizations drive adoption.",
      "5 - Require strong industry support; depend on widespread acceptance and stability provided by reputable organizations. Partnerships are critical for trust and reliability.",
      "6 - Strong industry support is present; partnerships are solidified; ongoing collaboration enhances technology use and development. Industry standards bodies may form around the technology.",
    ],
    fullDescription: "Strategic Partnerships and Industry Support evaluate how well the technology is backed by partnerships with industry leaders, vendors, and educational organizations."

  },
  {
    name: "Change Management and Cultural Acceptance (CMCA)",
    descriptions: [
      "1 - Resistance is high; change is unwelcome; organizational culture favors traditional methods. Lack of awareness or interest in new technologies.",
      "2 - Early adopters embrace change; promote benefits; act as champions for the technology. Begin to influence organizational attitudes; share success stories.",
      "3 - Address resistance; provide support and training; implement change management strategies; engage stakeholders to gain buy-in. Efforts focus on overcoming barriers to adoption.",
      "4 - Majority begins to accept; change management strategies are in place; cultural shift towards acceptance of new technologies. Policies and procedures support change; communication reinforces benefits.",
      "5 - Cultural acceptance is widespread; focus on optimization; adoption is common; resistance is minimal. Peer influence supports ongoing acceptance; technology becomes part of the organizational culture.",
      "6 - Change is embraced; organization is adaptive; culture supports continuous innovation. Change management is a standard practice for new initiatives; proactive approach to adopting emerging technologies.",
    ],
    fullDescription: "Change Management and Cultural Acceptance assess the readiness and willingness of the organization to adopt the technology, including how it fits within the existing culture and practices."

  },
]

// Initialize variables
var currentCriterionIndex = 0
var userStages = new Array(criteria.length).fill(1) // Default stage 1 for all criteria

// Adjust weights when the user selects a persona
function adjustWeights() {
  var persona = document.getElementById("persona-select").value
  selectedWeights = weights[persona]
}

// Display the current criterion
function displayCriterion() {
    var container = document.getElementById("criterion-container");
    container.innerHTML = ""; // Clear previous content

    var criterion = criteria[currentCriterionIndex];

  // Update criterion title and description
  document.getElementById("criterion-title").textContent = criterion.name;
  document.getElementById("criterion-full-description").textContent = criterion.fullDescription;

    // Create 6 clickable stage containers
    for (var i = 1; i <= 6; i++) {
        var stageContainer = document.createElement("div");
        stageContainer.classList.add("stage-container");
        stageContainer.textContent = criterion.descriptions[i - 1];  // Show the description
        stageContainer.setAttribute("data-stage", i);  // Set the stage value as data

        // If this stage is the user's current selection, highlight it
        if (userStages[currentCriterionIndex] === i) {
            stageContainer.classList.add("selected");
        }

        // Add click event to select this stage
        stageContainer.onclick = function() {
            userStages[currentCriterionIndex] = parseInt(this.getAttribute("data-stage"));  // Save the stage value (1-6)
            updateSelectedStage();
        };

        container.appendChild(stageContainer);
    }

    // Update navigation buttons
    document.getElementById("prev-button").disabled = currentCriterionIndex === 0;
    if (currentCriterionIndex === criteria.length - 1) {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("calculate-button").style.display = "inline";
    } else {
        document.getElementById("next-button").style.display = "inline";
        document.getElementById("calculate-button").style.display = "none";
    }

    // Update progress bar
    updateProgressBar();
}

// Function to update the progress bar
function updateProgressBar() {
    var progressBar = document.getElementById("progress-bar");
    var progressText = document.getElementById("progress-text");

    var progressPercentage = Math.round(((currentCriterionIndex + 1) / criteria.length) * 100); // Calculate progress
    progressBar.value = progressPercentage;  // Update the progress bar
    progressText.textContent = progressPercentage + "%";  // Update the progress text
}


// Highlight the selected stage container
function updateSelectedStage() {
  var stageContainers = document.querySelectorAll(".stage-container")
  stageContainers.forEach(function (container) {
    container.classList.remove("selected")
    if (
      parseInt(container.getAttribute("data-stage")) ===
      userStages[currentCriterionIndex]
    ) {
      container.classList.add("selected")
    }
  })
}

// Navigate to the next criterion
function nextCriterion() {
  if (currentCriterionIndex < criteria.length - 1) {
    currentCriterionIndex++
    displayCriterion()
  }
}

// Navigate to the previous criterion
function prevCriterion() {
  if (currentCriterionIndex > 0) {
    currentCriterionIndex--
    displayCriterion()
  }
}

// Calculate the total score and provide a recommendation
function calculateScore() {
  var totalScore = 0

  // Loop through each criterion
  for (var i = 0; i < criteria.length; i++) {
    var stage = userStages[i] // This is the selected stage (1-6)
    var weight = selectedWeights[i] // The corresponding weight for the criterion

    if (stage && weight) {
      // Ensure both stage and weight are available
      // Multiply the stage by the weight to get the score for this criterion
      var criterionScore = stage * weight
      totalScore += criterionScore // Add the criterion score to the total score
    } else {
      console.error(
        `Error calculating score for criterion ${i}: stage or weight missing.`,
      )
    }
  }

  // Display the total score
  document.getElementById("total-score").textContent = totalScore

  // Get and display the recommendation
  var recommendation = categorizeScore(totalScore)
  document.getElementById("recommendation").textContent = recommendation
}

// Provide recommendation based on the total score

var recommendations = {
  "Primary Students": [
    { range: [0, 37.5], action: "Ignore\nNo interest; no action required." },
    {
      range: [37.51, 75],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [75.01, 112.5],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [112.51, 150],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [150.01, 187.5],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [187.51, 225],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [225.01, 262.5],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [262.51, 300],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  "Secondary Students": [
    { range: [0, 46.5], action: "Ignore\nNo interest; no action required." },
    {
      range: [46.51, 93],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [93.01, 139.5],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [139.51, 186],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [186.01, 232.5],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [232.51, 279],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [279.01, 325.5],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [325.51, 372],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  "Tertiary Students": [
    { range: [0, 45.75], action: "Ignore\nNo interest; no action required." },
    {
      range: [45.76, 91.5],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [91.51, 137.25],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [137.26, 183],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [183.01, 228.75],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [228.76, 274.5],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [274.51, 320.25],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [320.26, 366],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  "Primary Teachers": [
    { range: [0, 45.75], action: "Ignore\nNo interest; no action required." },
    {
      range: [45.76, 91.5],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [91.51, 137.25],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [137.26, 183],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [183.01, 228.75],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [228.76, 274.5],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [274.51, 320.25],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [320.26, 366],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  "Secondary Teachers": [
    { range: [0, 49.5], action: "Ignore\nNo interest; no action required." },
    {
      range: [49.51, 99],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [99.01, 148.5],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [148.51, 198],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [198.01, 247.5],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [247.51, 297],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [297.01, 346.5],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [346.51, 396],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  "University Lecturers": [
    { range: [0, 48], action: "Ignore\nNo interest; no action required." },
    {
      range: [48.01, 96],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [96.01, 144],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [144.01, 192],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [192.01, 240],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [240.01, 288],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [288.01, 336],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [336.01, 384],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  Administrators: [
    { range: [0, 57], action: "Ignore\nNo interest; no action required." },
    {
      range: [57.01, 114],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [114.01, 171],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [171.01, 228],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [228.01, 285],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [285.01, 342],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [342.01, 399],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [399.01, 456],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
  Parents: [
    { range: [0, 42], action: "Ignore\nNo interest; no action required." },
    {
      range: [42.01, 84],
      action: "Monitor Casually\nMinimal interest; keep informed casually.",
    },
    {
      range: [84.01, 126],
      action:
        "Monitor Actively\nGrowing interest; monitor developments closely.",
    },
    {
      range: [126.01, 168],
      action: "Explore\nConsider potential; conduct small-scale trials.",
    },
    {
      range: [168.01, 210],
      action:
        "Prepare for Adoption\nPlan for implementation; allocate resources.",
    },
    {
      range: [210.01, 252],
      action: "Adopt\nImplement; integrate into regular use.",
    },
    {
      range: [252.01, 294],
      action: "Invest Heavily\nCommit significant resources; widespread use.",
    },
    {
      range: [294.01, 336],
      action:
        "Evaluate and Optimize\nMaximize benefits; continuous improvement.",
    },
  ],
}

function categorizeScore(totalScore) {
  var persona = document.getElementById("persona-select").value // Get selected persona
  var personaRecommendations = recommendations[persona] // Get recommendations for selected persona

  if (!personaRecommendations) {
    return "No recommendation available for this persona." // Handle missing persona
  }

  for (var i = 0; i < personaRecommendations.length; i++) {
    var rec = personaRecommendations[i]
    if (totalScore >= rec.range[0] && totalScore <= rec.range[1]) {
      return rec.action // Return the appropriate action
    }
  }

  return "No recommendation available for this score." // Fallback in case no match
}

// Initialize the first criterion display
displayCriterion()
