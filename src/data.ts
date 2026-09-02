export const universities = [
  {
    id: "monash",
    name: "Monash University",
    campus: "Clayton Campus",
    degrees: [
      {
        id: "b2001",
        name: "Bachelor of Commerce",
        code: "B2001",
        majors: [
          "Accounting", "Actuarial Studies", "Behavioural Commerce",
          "Business Analytics", "Econometrics", "Economics",
          "Finance", "Management Studies", "Marketing Science",
          "Sustainability and Responsible Management",
        ],
        coreSubjects: [
          { id: "acc1000", name: "Financial Accounting", code: "ACC1000" },
          { id: "blw1000", name: "Commercial Law", code: "BLW1000" },
          { id: "ecc1000", name: "Principles of Microeconomics", code: "ECC1000" },
          { id: "etc1000", name: "Business and Economic Statistics", code: "ETC1000" },
          { id: "mgt1000", name: "Management", code: "MGT1000" },
          { id: "mkt1000", name: "Marketing", code: "MKT1000" },
        ],
      },
      {
        id: "a2000",
        name: "Bachelor of Arts",
        code: "A2000",
        majors: [
          "Economics", "History", "Politics", "International Studies",
          "Philosophy", "Psychology", "Languages", "Literary Studies",
          "Sociology", "Media Studies",
        ],
        coreSubjects: [],
      },
    ],
  },
  {
    id: "unimelb",
    name: "University of Melbourne",
    campus: "Parkville",
    degrees: [
      {
        id: "melb-com",
        name: "Bachelor of Commerce",
        code: "BCOM",
        majors: [
          "Accounting", "Actuarial Studies", "Business Analytics",
          "Economics", "Finance", "Management", "Marketing",
        ],
        coreSubjects: [
          { id: "acct10001", name: "Accounting Reports and Analysis", code: "ACCT10001" },
          { id: "econ10004", name: "Introductory Microeconomics", code: "ECON10004" },
          { id: "econ10005", name: "Introductory Macroeconomics", code: "ECON10005" },
          { id: "fnce10001", name: "Finance", code: "FNCE10001" },
        ],
      },
      {
        id: "melb-arts",
        name: "Bachelor of Arts",
        code: "BARTS",
        majors: [
          "Economics", "History", "Politics", "Philosophy",
          "Psychology", "Sociology", "Media and Communications",
        ],
        coreSubjects: [],
      },
    ],
  },
];

export const sampleSubject = {
  id: "ecc1000",
  name: "Principles of Microeconomics",
  code: "ECC1000",
  weeks: [
    { id: 1, title: "Introduction to Microeconomics", topics: ["Scarcity", "Opportunity Cost", "PPF"], learningObjectives: ["Understand scarcity", "Calculate opportunity cost"] },
    { id: 2, title: "Demand and Supply", topics: ["Law of Demand", "Law of Supply", "Market Equilibrium"], learningObjectives: ["Graph demand/supply", "Find equilibrium"] },
    { id: 3, title: "Elasticity", topics: ["Price Elasticity", "Income Elasticity", "Cross Elasticity"], learningObjectives: ["Calculate elasticity", "Interpret values"] },
    { id: 4, title: "Consumer Theory", topics: ["Utility", "Indifference Curves", "Budget Constraints"], learningObjectives: ["Maximise utility", "Consumer choice"] },
    { id: 5, title: "Producer Theory", topics: ["Production Functions", "Costs", "Profit Maximisation"], learningObjectives: ["Calculate costs", "Profit-max output"] },
    { id: 6, title: "Market Structures", topics: ["Perfect Competition", "Monopoly", "Oligopoly"], learningObjectives: ["Compare structures", "Firm behaviour"] },
    { id: 7, title: "Externalities and Market Failure", topics: ["Positive Externalities", "Negative Externalities", "Public Goods"], learningObjectives: ["Identify failures", "Gov intervention"] },
    { id: 8, title: "Game Theory", topics: ["Nash Equilibrium", "Prisoner's Dilemma", "Dominant Strategies"], learningObjectives: ["Solve games", "Apply to real situations"] },
  ],
  assessments: [
    { id: "a1", name: "Quiz 1", weight: 10, result: 76, type: "quiz" },
    { id: "a2", name: "Assignment", weight: 20, result: 81, type: "assignment" },
    { id: "a3", name: "Mid-semester Test", weight: 20, result: 68, type: "midsem" },
    { id: "a4", name: "Final Exam", weight: 50, type: "final" },
  ],
  mastery: {
    "Demand & Supply": 91,
    Elasticity: 72,
    "Consumer Theory": 64,
    "Producer Theory": 82,
    "Market Structures": 53,
    Externalities: 46,
    "Game Theory": 66,
  },
};
