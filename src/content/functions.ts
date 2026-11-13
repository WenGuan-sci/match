/* Content for the Functions topic. Maths is LaTeX inside $...$ or $$...$$. */

const r = String.raw;

export type NoteBlock =
  | { kind: "p"; text: string }
  | { kind: "def"; title: string; text: string }
  | { kind: "tip"; title: string; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "graph" };

export type NoteSection = { id: string; title: string; blocks: NoteBlock[] };

export const notes: NoteSection[] = [
  {
    id: "what-is-a-function",
    title: "What is a function?",
    blocks: [
      {
        kind: "def",
        title: "Definition",
        text: r`A function $f$ is a rule that assigns to **each** element $x$ of a set $D_f$ (the **domain**) **exactly one** value $f(x)$. The set of all output values is the **range**, $R_f$.`,
      },
      {
        kind: "p",
        text: r`A function is only fully defined when you state both its rule and its domain. The two standard ways to write this are $$f : x \mapsto x^2 - 1,\ x \in \mathbb{R} \qquad\text{or}\qquad f(x) = x^2 - 1,\ x \in \mathbb{R}.$$`,
      },
      {
        kind: "tip",
        title: "Vertical line test",
        text: r`A graph represents a function if every vertical line $x = a$ with $a \in D_f$ cuts the graph **exactly once**.`,
      },
      {
        kind: "p",
        text: r`To find a range, **sketch the graph over the given domain** and read off the $y$-values. Completing the square helps for quadratics: $x^2 - 4x + 7 = (x-2)^2 + 3$, so for $x \in \mathbb{R}$ the range is $[3, \infty)$.`,
      },
    ],
  },
  {
    id: "one-one",
    title: "One-one functions",
    blocks: [
      {
        kind: "def",
        title: "Definition",
        text: r`$f$ is **one-one** if different inputs always give different outputs: $$f(x_1) = f(x_2) \implies x_1 = x_2.$$`,
      },
      {
        kind: "tip",
        title: "Horizontal line test",
        text: r`$f$ is one-one if every horizontal line $y = k$, $k \in \mathbb{R}$, cuts the graph of $f$ **at most once**.`,
      },
      {
        kind: "p",
        text: r`To show $f$ is **not** one-one, give a specific counter-example. For $f(x) = x^2$, $x \in \mathbb{R}$: the line $y = 1$ cuts the graph at $x = -1$ and $x = 1$, so $f(-1) = f(1) = 1$ and $f$ is not one-one.`,
      },
    ],
  },
  {
    id: "inverse",
    title: "Inverse functions",
    blocks: [
      {
        kind: "def",
        title: "Existence",
        text: r`The inverse function $f^{-1}$ exists **if and only if $f$ is one-one**.`,
      },
      { kind: "p", text: r`When $f^{-1}$ exists:` },
      {
        kind: "list",
        items: [
          r`$D_{f^{-1}} = R_f$ and $R_{f^{-1}} = D_f$ — domain and range swap.`,
          r`$f^{-1}f(x) = x$ for $x \in D_f$, and $ff^{-1}(x) = x$ for $x \in D_{f^{-1}}$.`,
          r`The graph of $y = f^{-1}(x)$ is the reflection of $y = f(x)$ in the line $y = x$.`,
        ],
      },
      { kind: "graph" },
      {
        kind: "p",
        text: r`**Finding the rule.** Let $y = f(x)$, make $x$ the subject, then replace $y$ with $x$. If you get a $\pm$, use the domain of $f$ to pick the correct sign.`,
      },
      {
        kind: "tip",
        title: "Restricting the domain",
        text: r`If $f$ is not one-one, restrict its domain to a region where the graph is strictly increasing or strictly decreasing — usually one side of a turning point.`,
      },
      {
        kind: "tip",
        title: "Where f meets its inverse",
        text: r`If $f$ is **increasing**, the graphs of $f$ and $f^{-1}$ can only meet on the line $y = x$, so solve the easier equation $f(x) = x$ instead. (For a decreasing function there may be other intersections, so check with a sketch.)`,
      },
    ],
  },
  {
    id: "composite",
    title: "Composite functions",
    blocks: [
      {
        kind: "def",
        title: "Definition",
        text: r`The composite $gf$ means "apply $f$ first, then $g$": $$gf(x) = g\big(f(x)\big).$$`,
      },
      {
        kind: "def",
        title: "Existence",
        text: r`$gf$ exists **if and only if** $R_f \subseteq D_g$ — every output of $f$ must be a valid input of $g$.`,
      },
      {
        kind: "list",
        items: [
          r`Domain: $D_{gf} = D_f$.`,
          r`Range: feed $R_f$ into $g$. That is, find the range of $g$ with its domain restricted to $R_f$.`,
          r`In general $gf \neq fg$. Order matters.`,
          r`$f^2$ means $ff$, i.e. $f^2(x) = f\big(f(x)\big)$ — **not** $[f(x)]^2$.`,
        ],
      },
      {
        kind: "tip",
        title: "Self-inverse functions",
        text: r`If $f = f^{-1}$ then $f^2(x) = x$. So $f^{n}(x) = x$ when $n$ is even and $f^{n}(x) = f(x)$ when $n$ is odd.`,
      },
    ],
  },
];

export type Example = {
  id: string;
  title: string;
  question: string;
  parts: { label: string; ask: string; steps: string[] }[];
};

export const examples: Example[] = [
  {
    id: "restrict-and-invert",
    title: "Restricting a domain and finding the inverse",
    question: r`The function $f$ is defined by $$f : x \mapsto x^2 - 6x + 5,\quad x \in \mathbb{R},\ x \ge k.$$`,
    parts: [
      {
        label: "i",
        ask: r`State the least value of $k$ for which $f^{-1}$ exists.`,
        steps: [
          r`Complete the square: $f(x) = (x - 3)^2 - 4$, so the graph has a minimum point at $(3, -4)$.`,
          r`For $f^{-1}$ to exist, $f$ must be one-one, so the domain must lie on one side of the turning point.`,
          r`Least value of $k$ is $3$.`,
        ],
      },
      {
        label: "ii",
        ask: r`Using this value of $k$, find $f^{-1}(x)$ and state its domain.`,
        steps: [
          r`Let $y = (x - 3)^2 - 4$. Then $(x - 3)^2 = y + 4$, so $x - 3 = \pm\sqrt{y + 4}$.`,
          r`Since $x \ge 3$, we need $x - 3 \ge 0$, so take the positive root: $x = 3 + \sqrt{y + 4}$.`,
          r`$$f^{-1}(x) = 3 + \sqrt{x + 4}$$`,
          r`$D_{f^{-1}} = R_f = [-4, \infty)$.`,
        ],
      },
      {
        label: "iii",
        ask: r`Solve the equation $f(x) = f^{-1}(x)$.`,
        steps: [
          r`$f$ is increasing for $x \ge 3$, so the graphs of $f$ and $f^{-1}$ meet only on the line $y = x$. Solve $f(x) = x$.`,
          r`$x^2 - 6x + 5 = x \implies x^2 - 7x + 5 = 0 \implies x = \dfrac{7 \pm \sqrt{29}}{2}$.`,
          r`Since $x \ge 3$, reject $\dfrac{7 - \sqrt{29}}{2} \approx 0.807$.`,
          r`$$x = \frac{7 + \sqrt{29}}{2} \approx 6.19$$`,
        ],
      },
    ],
  },
  {
    id: "composite-existence",
    title: "Does the composite exist?",
    question: r`The functions $f$ and $g$ are defined by $$f : x \mapsto \frac{1}{x - 2},\ x \in \mathbb{R},\ x \ne 2 \qquad g : x \mapsto x^2,\ x \in \mathbb{R}.$$`,
    parts: [
      {
        label: "i",
        ask: r`Explain why the composite function $fg$ does not exist.`,
        steps: [
          r`$fg$ exists only if $R_g \subseteq D_f$.`,
          r`$R_g = [0, \infty)$ and $D_f = \mathbb{R} \setminus \{2\}$.`,
          r`Since $2 \in R_g$ but $2 \notin D_f$, we have $R_g \not\subseteq D_f$, so $fg$ does not exist.`,
        ],
      },
      {
        label: "ii",
        ask: r`Show that $gf$ exists, and find its rule, domain and range.`,
        steps: [
          r`$R_f = \mathbb{R} \setminus \{0\}$ and $D_g = \mathbb{R}$. Since $R_f \subseteq D_g$, $gf$ exists.`,
          r`$$gf(x) = g\!\left(\frac{1}{x-2}\right) = \frac{1}{(x-2)^2}$$`,
          r`$D_{gf} = D_f = \mathbb{R} \setminus \{2\}$.`,
          r`For the range, feed $R_f = \mathbb{R} \setminus \{0\}$ into $g$: squaring any non-zero real number gives a positive number, and every positive number is obtained. So $R_{gf} = (0, \infty)$.`,
        ],
      },
    ],
  },
  {
    id: "range-of-composite",
    title: "Range of a composite function",
    question: r`The functions $f$ and $g$ are defined by $$f : x \mapsto e^x,\ x \in \mathbb{R} \qquad g : x \mapsto x^2 - 2x,\ x \in \mathbb{R}.$$ Find the range of $gf$.`,
    parts: [
      {
        label: "",
        ask: "",
        steps: [
          r`$R_f = (0, \infty)$ and $D_g = \mathbb{R}$, so $R_f \subseteq D_g$ and $gf$ exists.`,
          r`The range of $gf$ is the range of $g$ when its domain is restricted to $R_f = (0, \infty)$.`,
          r`$g(x) = (x - 1)^2 - 1$ has a minimum point at $(1, -1)$, and $x = 1$ lies inside $(0, \infty)$.`,
          r`As $x \to 0^+$, $g(x) \to 0$; as $x \to \infty$, $g(x) \to \infty$. The least value is $-1$, attained at $x = 1$.`,
          r`$$R_{gf} = [-1, \infty)$$`,
          r`**Common mistake:** substituting only the end-points of $R_f$ would miss the turning point. Always sketch $g$ over the restricted domain.`,
        ],
      },
    ],
  },
  {
    id: "self-inverse",
    title: "A self-inverse function",
    question: r`The function $f$ is defined by $$f : x \mapsto \frac{3x + 2}{x - 3},\quad x \in \mathbb{R},\ x \ne 3.$$`,
    parts: [
      {
        label: "i",
        ask: r`Find $f^{-1}(x)$ and hence write down $f^2(x)$.`,
        steps: [
          r`Let $y = \dfrac{3x + 2}{x - 3}$. Then $y(x - 3) = 3x + 2$, so $xy - 3x = 3y + 2$.`,
          r`$x(y - 3) = 3y + 2 \implies x = \dfrac{3y + 2}{y - 3}$.`,
          r`$$f^{-1}(x) = \frac{3x + 2}{x - 3},\quad x \ne 3$$`,
          r`So $f^{-1} = f$ (same rule and same domain), and therefore $f^2(x) = ff^{-1}(x) = x$.`,
        ],
      },
      {
        label: "ii",
        ask: r`Find the value of $f^{51}(4)$.`,
        steps: [
          r`Since $f^2(x) = x$, every even power of $f$ is the identity: $f^{50}(x) = x$.`,
          r`$f^{51}(4) = f\big(f^{50}(4)\big) = f(4)$.`,
          r`$$f^{51}(4) = \frac{3(4) + 2}{4 - 3} = 14$$`,
        ],
      },
    ],
  },
];

export type Question = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const quiz: Question[] = [
  {
    prompt: r`What is the largest possible domain of $f(x) = \ln(x - 2)$?`,
    options: [r`$x \ge 2$`, r`$x > 2$`, r`$x > 0$`, r`$x \in \mathbb{R}$`],
    answer: 1,
    explanation: r`$\ln u$ is defined only for $u > 0$, so we need $x - 2 > 0$, i.e. $x > 2$.`,
  },
  {
    prompt: r`Find the range of $f : x \mapsto x^2 - 4x + 7,\ x \in \mathbb{R}$.`,
    options: [r`$[7, \infty)$`, r`$(3, \infty)$`, r`$[3, \infty)$`, r`$\mathbb{R}$`],
    answer: 2,
    explanation: r`$x^2 - 4x + 7 = (x - 2)^2 + 3$. The minimum value $3$ is attained at $x = 2$, so $R_f = [3, \infty)$.`,
  },
  {
    prompt: r`Which of these functions is one-one?`,
    options: [
      r`$x \mapsto x^2,\ x \in \mathbb{R}$`,
      r`$x \mapsto |x|,\ x \in \mathbb{R}$`,
      r`$x \mapsto \sin x,\ x \in \mathbb{R}$`,
      r`$x \mapsto e^x,\ x \in \mathbb{R}$`,
    ],
    answer: 3,
    explanation: r`$e^x$ is strictly increasing, so every horizontal line cuts its graph at most once. For the others, e.g. $(-1)^2 = 1^2$, $|-1| = |1|$ and $\sin 0 = \sin \pi$.`,
  },
  {
    prompt: r`Given $f(x) = \dfrac{2x + 1}{x - 3},\ x \ne 3$, find $f^{-1}(x)$.`,
    options: [
      r`$\dfrac{3x + 1}{x - 2}$`,
      r`$\dfrac{x - 3}{2x + 1}$`,
      r`$\dfrac{3x - 1}{x + 2}$`,
      r`$\dfrac{2x - 1}{x + 3}$`,
    ],
    answer: 0,
    explanation: r`Let $y = \dfrac{2x+1}{x-3}$. Then $xy - 3y = 2x + 1$, so $x(y - 2) = 3y + 1$ and $x = \dfrac{3y+1}{y-2}$. Hence $f^{-1}(x) = \dfrac{3x+1}{x-2}$.`,
  },
  {
    prompt: r`$f(x) = x^2 - 1,\ x \in \mathbb{R}$ and $g(x) = \ln x,\ x > 0$. Which composite functions exist?`,
    options: [r`Both $fg$ and $gf$`, r`$gf$ only`, r`$fg$ only`, r`Neither`],
    answer: 2,
    explanation: r`$fg$: $R_g = \mathbb{R} \subseteq D_f = \mathbb{R}$, so $fg$ exists. $gf$: $R_f = [-1, \infty) \not\subseteq D_g = (0, \infty)$, so $gf$ does not exist.`,
  },
  {
    prompt: r`$f(x) = x^2 + 1,\ x \in \mathbb{R}$ and $g(x) = \ln x,\ x > 0$. Find the range of $gf$.`,
    options: [r`$\mathbb{R}$`, r`$(0, \infty)$`, r`$[1, \infty)$`, r`$[0, \infty)$`],
    answer: 3,
    explanation: r`$R_f = [1, \infty)$. Feeding this into $g$: $\ln$ is increasing with $\ln 1 = 0$, so $R_{gf} = [0, \infty)$.`,
  },
  {
    prompt: r`$f(x) = (x - 1)^2 + 2,\ x \le k$. What is the largest value of $k$ for which $f^{-1}$ exists?`,
    options: [r`$k = 2$`, r`$k = 1$`, r`$k = 0$`, r`$k = -1$`],
    answer: 1,
    explanation: r`The turning point is at $x = 1$. For $f$ to be one-one the domain must stay on one side of it, so the largest $k$ is $1$.`,
  },
  {
    prompt: r`The graph of $y = f^{-1}(x)$ is obtained from the graph of $y = f(x)$ by a reflection in…`,
    options: [r`the $x$-axis`, r`the $y$-axis`, r`the line $y = x$`, r`the line $y = -x$`],
    answer: 2,
    explanation: r`If $(a, b)$ lies on $y = f(x)$ then $(b, a)$ lies on $y = f^{-1}(x)$. Swapping coordinates is a reflection in $y = x$.`,
  },
  {
    prompt: r`$f(x) = e^x + 1,\ x \in \mathbb{R}$. What is the domain of $f^{-1}$?`,
    options: [r`$(1, \infty)$`, r`$(0, \infty)$`, r`$[1, \infty)$`, r`$\mathbb{R}$`],
    answer: 0,
    explanation: r`$D_{f^{-1}} = R_f$. Since $e^x > 0$, $e^x + 1 > 1$, so $R_f = (1, \infty)$. (Indeed $f^{-1}(x) = \ln(x - 1)$.)`,
  },
  {
    prompt: r`$f(x) = \dfrac{x + 2}{x - 1},\ x \ne 1$ satisfies $f^2(x) = x$. Find $f^{2025}(5)$.`,
    options: [r`$5$`, r`$\dfrac{7}{4}$`, r`$\dfrac{4}{7}$`, r`$2025$`],
    answer: 1,
    explanation: r`Since $f^2(x) = x$, $f^{2024}(x) = x$. So $f^{2025}(5) = f(5) = \dfrac{5 + 2}{5 - 1} = \dfrac{7}{4}$.`,
  },
];
