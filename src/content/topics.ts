export type Topic = { slug: string; title: string; blurb: string; ready: boolean };
export type Strand = { name: string; topics: Topic[] };

const soon = (slug: string, title: string, blurb: string): Topic => ({
  slug,
  title,
  blurb,
  ready: false,
});

/** H2 Mathematics (9758) topic map. Only topics with `ready: true` have pages. */
export const strands: Strand[] = [
  {
    name: "Functions and Graphs",
    topics: [
      {
        slug: "functions",
        title: "Functions",
        blurb: "Domain and range, one-one functions, inverses and composites.",
        ready: true,
      },
      soon("graphs", "Graphs and Transformations", "Curve sketching, conics and transformations."),
      soon("inequalities", "Equations and Inequalities", "Solving inequalities and systems of equations."),
    ],
  },
  {
    name: "Sequences and Series",
    topics: [
      soon("sequences", "Sequences and Series", "AP, GP, sigma notation and method of differences."),
    ],
  },
  {
    name: "Vectors",
    topics: [soon("vectors", "Vectors", "Scalar and vector products, lines and planes.")],
  },
  {
    name: "Complex Numbers",
    topics: [
      soon("complex-numbers", "Complex Numbers", "Cartesian and polar forms, roots of equations."),
    ],
  },
  {
    name: "Calculus",
    topics: [
      soon("differentiation", "Differentiation", "Techniques, tangents, rates of change and maxima."),
      soon("maclaurin", "Maclaurin Series", "Series expansions and small-angle approximations."),
      soon("integration", "Integration Techniques", "Substitution, by parts and partial fractions."),
      soon("definite-integrals", "Definite Integrals", "Areas and volumes of revolution."),
      soon("differential-equations", "Differential Equations", "First and second order equations and modelling."),
    ],
  },
  {
    name: "Probability and Statistics",
    topics: [
      soon("counting", "Permutations and Combinations", "Counting principles and arrangements."),
      soon("probability", "Probability", "Conditional probability and independence."),
      soon("drv", "Discrete Random Variables", "Expectation, variance and the binomial distribution."),
      soon("normal", "Normal Distribution", "Standardising and linear combinations."),
      soon("sampling", "Sampling", "Sample mean and the Central Limit Theorem."),
      soon("hypothesis-testing", "Hypothesis Testing", "z-tests and t-tests for a population mean."),
      soon("regression", "Correlation and Regression", "Product moment correlation and regression lines."),
    ],
  },
];
