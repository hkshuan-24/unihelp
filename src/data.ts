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

export interface WeekContent {
  id: number;
  title: string;
  topics: string[];
  learningObjectives: string[];
  content: {
    summary: string;
    sections: {
      title: string;
      body: string;
    }[];
  };
  notes: {
    quick: string;
    standard: string;
    deep: string;
    exam: string;
  };
}

export const weekContents: WeekContent[] = [
  {
    id: 1,
    title: "Introduction to Microeconomics",
    topics: ["Scarcity", "Opportunity Cost", "Production Possibility Frontier (PPF)", "Circular Flow Model", "Positive vs Normative Analysis"],
    learningObjectives: [
      "Define scarcity and explain why it forces choices",
      "Calculate opportunity cost from given data",
      "Draw and interpret a PPF with increasing opportunity cost",
      "Distinguish between positive and normative statements",
      "Explain how the circular flow model connects households and firms"
    ],
    content: {
      summary: "Microeconomics studies how individuals, households, and firms make decisions and how they interact in markets. This week establishes the foundational concepts that underpin all economic analysis.",
      sections: [
        {
          title: "Scarcity and Choice",
          body: "Scarcity means that human wants for goods, services, and resources exceed what is available. Because we cannot have everything we want, we must make choices. Economics is the study of how society manages its scarce resources. Every choice involves a trade-off."
        },
        {
          title: "Opportunity Cost",
          body: "The opportunity cost of any action is the value of the next-best alternative that must be forgone. It is not simply the monetary cost but the real value of what you give up. If you spend $100 on textbooks, the opportunity cost includes not just the $100 but whatever else you could have done with that money and time. To calculate: identify the next best alternative and quantify its value."
        },
        {
          title: "Production Possibility Frontier (PPF)",
          body: "The PPF is a curve showing the maximum combinations of two goods that can be produced with available resources and technology. Points ON the curve are efficient. Points INSIDE are inefficient (unused resources). Points OUTSIDE are unattainable with current resources. The bowed-out shape reflects increasing opportunity cost — as you produce more of one good, you must give up increasingly larger amounts of the other. This happens because resources are not perfectly adaptable."
        },
        {
          title: "Circular Flow Model",
          body: "The circular flow diagram shows how dollars and resources move through the economy. Households own factors of production (labour, land, capital) and sell them to firms in factor markets. Firms use these factors to produce goods and services, which they sell to households in product markets. Money flows in the opposite direction: households pay firms for goods; firms pay households for factors."
        },
        {
          title: "Positive vs Normative Economics",
          body: "Positive statements are objective and fact-based: 'An increase in price leads to a decrease in quantity demanded.' They can be tested against evidence. Normative statements are subjective and value-based: 'The government should increase the minimum wage.' They express opinions about what ought to be and cannot be proven true or false."
        }
      ]
    },
    notes: {
      quick: "Scarcity → choices → opportunity cost. PPF shows trade-offs. Bowed out = increasing opp cost. Circular flow: households ↔ firms through product and factor markets. Positive = facts, Normative = opinions.",
      standard: "Microeconomics studies individual decision-making under scarcity. Key tools: PPF (efficiency, opportunity cost, economic growth), circular flow (households as sellers of labour/buyers of goods; firms as buyers of labour/sellers of goods), and the distinction between positive (testable) and normative (value-based) statements. A PPF shifts outward with more resources or better technology (economic growth).",
      deep: "The PPF is derived from production functions and resource constraints. With n goods and fixed total resources R, the PPF is the solution to max Σqi subject to Σri ≤ R. The slope is the marginal rate of transformation (MRT). Under constant returns and identical factor intensities, the PPF is linear. With heterogeneous resources, diminishing marginal returns create the concave (bowed-out) shape. The circular flow assumes: (1) two-sector closed economy, (2) no government, (3) no financial sector. Extending to open economy adds foreign sector; adding government introduces taxes and transfers. Positive statements rely on the ceteris paribus assumption.",
      exam: "Common exam formats: (1) Calculate opportunity cost from a PPF table — find what you give up per unit gained. (2) Identify positive vs normative statements — look for 'should', 'ought', 'better', 'fair'. (3) Draw a PPF showing economic growth (shift outward) or recession (shift inward). (4) Explain why PPF is bowed out — resources are not perfectly substitutable. (5 marks typically: 1 for axes, 1 for correct shape, 1 for labelled points, 2 for explanation."
    }
  },
  {
    id: 2,
    title: "Demand and Supply",
    topics: ["Law of Demand", "Law of Supply", "Market Equilibrium", "Shifts vs Movements", "Surplus and Shortage"],
    learningObjectives: [
      "Draw demand and supply curves and label axes correctly",
      "Identify factors that shift demand and supply",
      "Calculate equilibrium price and quantity",
      "Distinguish between shifts of curves and movements along curves",
      "Predict price changes when demand or supply shifts"
    ],
    content: {
      summary: "Demand and supply are the two fundamental forces that determine price and quantity in competitive markets. Understanding how they interact is essential for all subsequent microeconomic analysis.",
      sections: [
        {
          title: "The Law of Demand",
          body: "The law of demand states that, ceteris paribus, as the price of a good increases, the quantity demanded decreases. This creates a downward-sloping demand curve. The negative relationship exists because of: (1) Substitution effect — consumers switch to cheaper alternatives; (2) Income effect — higher prices reduce purchasing power. A change in the good's own price causes a MOVEMENT along the demand curve. A change in any other factor (income, tastes, prices of related goods, expectations, number of buyers) causes a SHIFT of the entire curve."
        },
        {
          title: "The Law of Supply",
          body: "The law of supply states that, ceteris paribus, as the price of a good increases, the quantity supplied increases. This creates an upward-sloping supply curve. Higher prices mean greater revenue and profit, incentivising firms to produce more. A change in the good's own price causes a MOVEMENT along the supply curve. A change in input prices, technology, number of sellers, expectations, or taxes/subsidies causes a SHIFT of the entire curve."
        },
        {
          title: "Market Equilibrium",
          body: "Equilibrium occurs where the quantity demanded equals the quantity supplied (Qd = Qs). At this point, the market clears — there is no surplus (excess supply) and no shortage (excess demand). The equilibrium price (P*) is the price at which this occurs. If price is above P*, surplus causes price to fall. If price is below P*, shortage causes price to rise. The 'invisible hand' guides markets toward equilibrium without central coordination."
        },
        {
          title: "Shifts vs Movements",
          body: "This distinction is critical. A movement ALONG a curve is caused ONLY by a change in the good's own price. A SHIFT of the entire curve is caused by a change in ANY other relevant factor. Demand shifters: income (normal goods up, inferior goods down), prices of substitutes (up) and complements (down), tastes, expectations, number of buyers. Supply shifters: input prices (inverse), technology (positive), number of sellers (positive), expectations, taxes (inverse), subsidies (positive)."
        },
        {
          title: "Comparative Statics",
          body: "Comparative statics compares one equilibrium to another after a shift. If demand increases (shifts right) and supply is unchanged: P rises, Q rises. If supply decreases (shifts left) and demand is unchanged: P rises, Q falls. If both shift, the effect on P or Q depends on the relative magnitudes. Practice drawing the four cases: D↑, D↓, S↑, S↓."
        }
      ]
    },
    notes: {
      quick: "Demand ↓-sloping (substitution + income effects). Supply ↑-sloping (profit motive). Equilibrium where Qd=Qs. Movement = own price change. Shift = other factor changes. D shifters: income, related goods prices, tastes, expectations, #buyers. S shifters: input prices, technology, #sellers, taxes/subsidies.",
      standard: "Demand curve: Qd = a - bP. Supply curve: Qs = c + dP. Set equal to find equilibrium: P* = (a-c)/(b+d), Q* = a - bP*. Demand shifters shift the intercept 'a'. Supply shifters shift the intercept 'c'. Normal goods: demand ↑ when income ↑. Inferior goods: demand ↓ when income ↑. Substitutes: Price of X ↑ → Demand for Y ↑. Complements: Price of X ↑ → Demand for Y ↓. At prices above P*, surplus = Qs - Qd. At prices below P*, shortage = Qd - Qs. Markets self-correct through price adjustments.",
      deep: "The demand function Qd(P, I, Ps, Pc, T) is derived from consumer utility maximisation. The Slutsky equation decomposes price effects: ∂x/∂p = ∂x^h/∂p - x(∂x/∂m), where the first term is the substitution effect (always negative) and the second is the income effect (negative for normal goods, positive for inferior goods — but rarely strong enough to create Giffen goods). Supply is derived from profit maximisation: max π = P·Q - C(Q), FOC gives P = MC. For competitive firms, the supply curve is the MC curve above AVC. Market supply is the horizontal summation of individual firm supply curves. Equilibrium stability: if d(Qs-Qd)/dP > 0 at equilibrium, it is Walrasian stable. Comparative statics uses total differentiation: dP* = (dD - dS)/(S' - D').",
      exam: "Most tested topic. (1) Draw D&S with correct labels, axes, slopes. (2) Show shift and trace new P*, Q*. (3) Calculate equilibrium from equations: set Qd=Qs. (4) If P is fixed above equilibrium, calculate surplus. (5) Identify whether a statement describes a shift or movement. (6) Multiple shifts: 'Both D and S increase' — Q definitely rises, P ambiguous. Common mistake: confusing 'increase in demand' (shift right) with 'increase in quantity demanded' (movement down along curve). 5-mark question structure: 1 diagram, 2 shift arrows, 1 new equilibrium labels, 1 explanation."
    }
  },
  {
    id: 3,
    title: "Elasticity",
    topics: ["Price Elasticity of Demand (PED)", "Price Elasticity of Supply (PES)", "Income Elasticity (YED)", "Cross-Price Elasticity (XED)", "Applications and Tax Incidence"],
    learningObjectives: [
      "Calculate all four types of elasticity",
      "Classify elasticity as elastic, inelastic, or unit elastic",
      "Explain the determinants of PED",
      "Use elasticity to predict total revenue changes",
      "Apply elasticity to real-world policy questions"
    ],
    content: {
      summary: "Elasticity measures responsiveness. It answers: 'By how much does quantity respond to a change in price, income, or the price of another good?'",
      sections: [
        {
          title: "Price Elasticity of Demand (PED)",
          body: "PED = (% change in quantity demanded) / (% change in price). Because of the law of demand, PED is typically negative, but we report the absolute value. If |PED| > 1: elastic (quantity is responsive). If |PED| < 1: inelastic (quantity is unresponsive). If |PED| = 1: unit elastic. Determinants of PED: availability of substitutes (more substitutes = more elastic), necessity vs luxury (luxuries more elastic), definition of the market (narrow markets more elastic), time horizon (longer time = more elastic), proportion of income (larger share = more elastic)."
        },
        {
          title: "Total Revenue and PED",
          body: "Total Revenue = Price × Quantity. If demand is elastic, price increase → TR decreases (quantity falls more than price rises). If demand is inelastic, price increase → TR increases (quantity falls less than price rises). If unit elastic, TR is maximised and unchanged by small price changes. This is why airlines charge different prices (elastic business travellers vs inelastic holiday travellers)."
        },
        {
          title: "Price Elasticity of Supply (PES)",
          body: "PES = (% change in quantity supplied) / (% change in price). PES > 1: elastic supply. PES < 1: inelastic supply. PES = 0: perfectly inelastic (vertical supply). PES = ∞: perfectly elastic (horizontal supply). Determinants: flexibility of production, time to respond, spare capacity, ease of storage."
        },
        {
          title: "Income and Cross-Price Elasticity",
          body: "YED = (% change in quantity demanded) / (% change in income). YED > 0: normal good. YED < 0: inferior good. YED > 1: luxury good. XED = (% change in quantity demanded of Good A) / (% change in price of Good B). XED > 0: substitutes. XED < 0: complements. XED = 0: unrelated goods."
        },
        {
          title: "Midpoint Formula",
          body: "For more accurate elasticity between two points, use the midpoint (arc elasticity) formula: PED = [(Q2-Q1)/((Q1+Q2)/2)] / [(P2-P1)/((P1+P2)/2)]. This gives the same result regardless of which point is the starting point, solving the base-point bias of simple percentage changes."
        }
      ]
    },
    notes: {
      quick: "PED = %ΔQd / %ΔP. |PED|>1 = elastic, <1 = inelastic, =1 = unit. TR test: elastic → price↑ TR↓, inelastic → price↑ TR↑. PES same formula for supply. YED>0 normal, <0 inferior. XED>0 substitutes, <0 complements. Use midpoint formula for accuracy between two points.",
      standard: "Elasticity is a unitless measure of responsiveness. PED along a linear demand curve varies from ∞ (top) to 0 (bottom). At the midpoint, PED = 1 and TR is maximised. Total revenue test: dTR/dP = Q(1 - |PED|). Thus if |PED|>1, dTR/dP<0. Key determinants of PED: (1) substitutes — salt has few substitutes (inelastic), Coca-Cola has many (elastic); (2) necessities vs luxuries — insulin inelastic, restaurant meals elastic; (3) time — short-run gasoline demand inelastic, long-run more elastic as people buy efficient cars. Tax incidence depends on relative elasticities: the more inelastic side bears more tax burden.",
      deep: "Point elasticity: ε = (dQ/dP)·(P/Q). For linear demand Q = a - bP, dQ/dP = -b, so ε = -bP/(a-bP). At P=0, ε=0; at Q=0 (P=a/b), ε→-∞. The revenue-maximising point occurs where |ε|=1, which for linear demand is at P = a/(2b), Q = a/2. Constant elasticity demand: Q = aP^(-b), where b is the constant elasticity. Isoelastic (log-linear) specification: lnQ = lna - blnP. Tax incidence derivation: with tax t, consumer price Pc = Ps + t. Set Qd(Pc) = Qs(Ps). Totally differentiating: dPc/dt = εs/(εs - εd) and dPs/dt = εd/(εs - εd), where elasticities are defined positively. Thus consumers bear more burden when supply is more elastic relative to demand.",
      exam: "(1) Calculate PED using midpoint formula — very common 3-mark question. (2) Classify good given elasticity value. (3) TR analysis: 'If firm raises price and demand is elastic, what happens to TR?' Answer: decreases. (4) Given PED, predict quantity change from price change: %ΔQ = PED × %ΔP. (5) Tax incidence: 'Who bears more burden when demand is inelastic and supply is elastic?' Answer: consumers. (6) YED/XED classification from calculated values. (7) Multiple choice: 'Which good is most likely to have PED > 1?' — look for luxury with many substitutes. Common error: using simple % change instead of midpoint. Always state absolute value. Show working: %ΔQ = ..., %ΔP = ..., PED = ..."
    }
  },
  {
    id: 4,
    title: "Consumer Theory",
    topics: ["Utility and Preferences", "Indifference Curves", "Marginal Rate of Substitution (MRS)", "Budget Constraints", "Consumer Equilibrium"],
    learningObjectives: [
      "Explain utility maximisation as the basis of consumer choice",
      "Draw and interpret indifference curves",
      "Calculate MRS and explain its meaning",
      "Construct a budget constraint from income and prices",
      "Find the consumer's optimal bundle"
    ],
    content: {
      summary: "Consumer theory explains how individuals make choices given their limited budgets. It provides the microfoundations for the demand curve.",
      sections: [
        {
          title: "Utility and Preferences",
          body: "Utility is the satisfaction a consumer gets from consuming goods. Total Utility (TU) is the total satisfaction from a quantity consumed. Marginal Utility (MU) is the additional satisfaction from consuming one more unit. The law of diminishing marginal utility states that as consumption increases, MU decreases. Rational consumers seek to maximise total utility subject to their budget constraint."
        },
        {
          title: "Indifference Curves",
          body: "An indifference curve shows all combinations of two goods that give the consumer equal total utility. Properties: (1) Downward sloping — to keep utility constant, giving up one good requires more of the other. (2) Convex to origin — diminishing MRS. (3) Higher curves represent higher utility. (4) Curves never intersect. (5) There are infinitely many curves filling the space."
        },
        {
          title: "Marginal Rate of Substitution (MRS)",
          body: "MRS is the rate at which a consumer is willing to trade one good for another while maintaining the same utility level. MRS = -ΔY/ΔX (slope of indifference curve). It equals the ratio of marginal utilities: MRS = MUx/MUy. As you consume more X, MUx falls (diminishing MU), so you are willing to give up less Y — hence MRS diminishes and the curve is convex."
        },
        {
          title: "Budget Constraint",
          body: "The budget constraint shows all affordable combinations: P·X + P·Y = I. Rearranged: Y = (I/Py) - (Px/Py)·X. The slope is -Px/Py (the price ratio, or opportunity cost of X in terms of Y). The X-intercept is I/Px (all income spent on X). The Y-intercept is I/Py. Changes in income shift the constraint outward (income rise) or inward (income fall) in parallel. Changes in price rotate the constraint."
        },
        {
          title: "Consumer Equilibrium",
          body: "The optimal bundle occurs where the budget constraint is tangent to the highest attainable indifference curve. At this point: MRS = Px/Py, or equivalently MUx/Px = MUy/Py. The last dollar spent on each good yields equal marginal utility. If MUx/Px > MUy/Py, the consumer should buy more X and less Y. The demand curve is derived by finding the optimal X at different prices and tracing the price-quantity pairs."
        }
      ]
    },
    notes: {
      quick: "Consumers maximise utility subject to budget. Indifference curves: downward sloping, convex, higher = better, don't cross. MRS = slope of IC = MUx/MUy. Budget: Px·X + Py·Y = I, slope = -Px/Py. Equilibrium: MRS = Px/Py or MUx/Px = MUy/Py. Demand curve derived from changing Px and finding new optimal X.",
      standard: "Consumer equilibrium requires MRS = price ratio. This is the tangency condition. If MRS > Px/Py, the consumer values X more highly relative to Y than the market does — they should buy more X. The income-consumption curve traces optimal bundles as income changes (holding prices constant). The price-consumption curve traces optimal bundles as Px changes. From the price-consumption curve, we derive the individual demand curve. Normal goods: demand rises with income (income elasticity > 0). Inferior goods: demand falls with income (income elasticity < 0). Giffen goods: demand rises when price rises (strongly inferior, theoretical rarity).",
      deep: "Utility functions: Cobb-Douglas U(X,Y) = X^α·Y^(1-α) yields constant expenditure shares (α on X, 1-α on Y). Perfect substitutes U(X,Y) = aX + bY yield linear ICs and corner solutions. Perfect complements U(X,Y) = min(aX, bY) yield L-shaped ICs. Quasi-linear U(X,Y) = v(X) + Y yields no income effect for Y. The Slutsky equation: ∂x/∂p = ∂x^h/∂p - x(∂x/∂m). Hicksian (compensated) demand x^h(p,u) minimises expenditure for given utility. Marshallian demand x(p,m) maximises utility for given income. The envelope theorem yields Roy's identity: x = -(∂V/∂p)/(∂V/∂m), where V is indirect utility. Expenditure function e(p,u) gives minimum income to reach utility u.",
      exam: "(1) Draw budget constraint with correct intercepts and slope. (2) Show consumer equilibrium at tangency — label MRS = price ratio. (3) Show effect of income increase (parallel shift, new tangency on higher IC). (4) Show effect of price decrease (pivot outward, substitution and income effects). (5) Derive demand curve from price-consumption curve. (6) Distinguish normal, inferior, Giffen goods using income effect direction. Common 8-mark question: 'Using indifference curve analysis, show the effect of a decrease in the price of good X for a normal good.' Answer must include: original equilibrium, pivot of budget line, new equilibrium, decomposition into substitution effect (Hicks: parallel to new IC; Slutsky: parallel through original bundle) and income effect, correctly labelled diagram."
    }
  },
  {
    id: 5,
    title: "Producer Theory",
    topics: ["Production Functions", "Short Run vs Long Run", "Costs (FC, VC, TC, MC, AC, AVC)", "Cost Curves", "Profit Maximisation"],
    learningObjectives: [
      "Distinguish between short-run and long-run production",
      "Calculate total, average, and marginal product",
      "Derive cost curves from production data",
      "Find the profit-maximising output level",
      "Explain the relationship between MP and MC"
    ],
    content: {
      summary: "Producer theory examines how firms transform inputs into outputs and how they choose the profit-maximising level of production.",
      sections: [
        {
          title: "Production Functions",
          body: "A production function describes the relationship between inputs (labour L, capital K) and output (Q): Q = f(L,K). In the short run, at least one input is fixed (typically capital). In the long run, all inputs are variable. Total Product (TP) is total output. Average Product (AP) = TP/L. Marginal Product (MP) = ΔTP/ΔL. The law of diminishing marginal returns states that as more of a variable input is added to a fixed input, MP eventually decreases."
        },
        {
          title: "Short-Run Costs",
          body: "Fixed Costs (FC): do not vary with output (rent, salaries). Variable Costs (VC): vary with output (raw materials, hourly labour). Total Cost (TC) = FC + VC. Marginal Cost (MC) = ΔTC/ΔQ = ΔVC/ΔQ (since FC is constant). Average Total Cost (ATC) = TC/Q. Average Variable Cost (AVC) = VC/Q. Average Fixed Cost (AFC) = FC/Q. Key relationship: when MP is rising, MC is falling; when MP is at its maximum, MC is at its minimum; when MP is falling, MC is rising."
        },
        {
          title: "Cost Curve Shapes",
          body: "The MC curve is U-shaped due to initially increasing then diminishing marginal returns. The ATC curve is U-shaped: initially AFC dominates (pulling average down), eventually diminishing returns dominate (pulling average up). The MC curve intersects both AVC and ATC at their minimum points. When MC < ATC, ATC is falling. When MC > ATC, ATC is rising. The vertical distance between ATC and AVC equals AFC, which shrinks as Q increases (spreading the fixed cost over more units)."
        },
        {
          title: "Long-Run Costs",
          body: "In the long run, all costs are variable. The Long-Run Average Cost (LRAC) curve is the envelope of all possible short-run ATC curves. It is typically U-shaped due to economies of scale (falling LRAC at low output), constant returns to scale (flat LRAC), and diseconomies of scale (rising LRAC at high output). Economies of scale arise from specialisation, bulk buying, and indivisible inputs. Diseconomies arise from coordination problems and management inefficiencies."
        },
        {
          title: "Profit Maximisation",
          body: "Firms maximise profit π = TR - TC. The profit-maximising rule: produce where MR = MC (marginal revenue equals marginal cost). If MR > MC, producing one more unit adds more to revenue than to cost — profit rises. If MR < MC, producing one more unit adds more to cost than to revenue — profit falls. In perfect competition, P = MR (price-taking firm), so the rule simplifies to P = MC. The shutdown rule: in the short run, produce if P ≥ AVC (covers variable costs). If P < AVC, shut down to minimise losses (lose FC only)."
        }
      ]
    },
    notes: {
      quick: "Production: Q=f(L,K). Short run = one input fixed. MP = ΔTP/ΔL, eventually diminishes. Costs: TC=FC+VC, MC=ΔTC/ΔQ, ATC=TC/Q, AVC=VC/Q. MC intersects ATC/AVC at minimums. Long run = all inputs variable. LRAC envelope of SRATCs. Economies of scale → falling LRAC. Profit max: MR=MC. Shutdown: P<AVC.",
      standard: "The relationship between MP and MC is inverse: MC = w/MP, where w is wage. When MP is high, MC is low. When diminishing returns set in, MP falls and MC rises. The MC curve is the mirror image of the MP curve (flipped vertically). In perfect competition, the firm's short-run supply curve is the MC curve above the minimum AVC. The long-run supply decision: produce if P ≥ minimum ATC (zero economic profit is the break-even point; positive economic profit attracts entry). Economic profit = total revenue - explicit costs - implicit costs (opportunity cost of owner's resources). Normal profit = zero economic profit (covers all opportunity costs).",
      deep: "Cobb-Douglas production: Q = AL^α·K^β. Returns to scale: if α+β > 1, increasing; = 1, constant; < 1, decreasing. Cost minimisation: min wL + rK s.t. f(L,K) = Q. Lagrangian yields MRTS = w/r, where MRTS = MPL/MPK. The expansion path traces cost-minimising input combinations as output changes. Shephard's lemma: ∂c/∂w = L*(w,r,Q), where c is the cost function. Duality: the production function and cost function contain equivalent information. Short-run cost function: C(Q) = c(w,r,Q) + r·K̄ (where K̄ is fixed). Long-run cost function: C(Q) = c(w,r,Q) with K variable. Hotelling's lemma: ∂π/∂p = Q*(p,w,r) — the supply function is the derivative of the profit function.",
      exam: "(1) Complete a cost table: given FC and VC at each Q, calculate TC, MC, ATC, AVC. (2) Draw cost curves: U-shaped MC, U-shaped ATC, always-declining AFC. Show MC crossing ATC at minimum ATC. (3) Apply profit-maximising rule: given demand and cost data, find Q where MR=MC. (4) Shutdown decision: if P=$5 and minimum AVC=$6, should firm produce? No — shut down, lose FC only. (5) Long-run equilibrium in perfect competition: P = minimum ATC, zero economic profit. (6) Calculate profit at a given Q: π = (P-ATC)×Q. Common 6-mark question: 'Given the following cost data, find the profit-maximising output and calculate profit at that output.' Show MR=MC working, then π calculation."
    }
  },
  {
    id: 6,
    title: "Market Structures",
    topics: ["Perfect Competition", "Monopoly", "Monopolistic Competition", "Oligopoly", "Game Theory Basics"],
    learningObjectives: [
      "Compare and contrast the four market structures",
      "Find equilibrium price and quantity in perfect competition",
      "Explain why MR < P for a monopolist",
      "Calculate deadweight loss from monopoly",
      "Describe Nash equilibrium in oligopoly"
    ],
    content: {
      summary: "Market structure determines firm behaviour and market outcomes. Perfect competition yields efficiency; monopoly creates deadweight loss; oligopoly involves strategic interdependence.",
      sections: [
        {
          title: "Perfect Competition",
          body: "Characteristics: many buyers and sellers, homogeneous products, free entry and exit, perfect information, price-taking firms. Demand facing individual firm: perfectly elastic (horizontal) at market price. Short-run equilibrium: P = MR = MC. Long-run equilibrium: P = minimum ATC (zero economic profit). Firms enter if P > ATC (positive profit), exit if P < ATC (losses). This entry/exit process drives economic profit to zero in the long run. Efficient outcome: P = MC (allocative efficiency) and P = minimum ATC (productive efficiency)."
        },
        {
          title: "Monopoly",
          body: "Characteristics: single seller, no close substitutes, high barriers to entry (legal, natural, control of resources), price maker. The monopolist faces the market demand curve (downward sloping). To sell more, they must lower price on ALL units, so MR < P. The MR curve lies below the demand curve. Profit-maximising output: MR = MC. Price is set on the demand curve above this quantity. Monopoly creates deadweight loss because P > MC — the monopolist restricts output and charges a higher price than the competitive outcome."
        },
        {
          title: "Price Discrimination",
          body: "A monopolist may charge different prices to different consumer groups. First-degree (perfect): charge each consumer their maximum willingness to pay — extracts all consumer surplus, no deadweight loss. Second-degree: quantity discounts. Third-degree: segment markets by elasticity — charge lower prices to more elastic groups (students, seniors) and higher prices to less elastic groups. Requirements: market power, ability to segment markets, prevent arbitrage (resale)."
        },
        {
          title: "Monopolistic Competition",
          body: "Characteristics: many firms, differentiated products (branding, quality, location), some market power, free entry and exit. Short-run: like monopoly (MR = MC, P > MC, possible profits). Long-run: entry of competitors erodes demand for each firm until P = ATC and economic profit is zero. Unlike perfect competition, P > MC (inefficient) and firms operate on the downward-sloping portion of ATC (excess capacity). Examples: restaurants, hair salons, clothing retailers."
        },
        {
          title: "Oligopoly and Game Theory",
          body: "Characteristics: few dominant firms, interdependent decision-making, barriers to entry. Firms consider rivals' reactions. Game theory models strategic interaction. The prisoner's dilemma shows why individually rational choices lead to collectively worse outcomes. Nash equilibrium: each player's strategy is optimal given the other players' strategies. In Cournot oligopoly, firms choose quantities simultaneously. In Bertrand, firms choose prices. Cartels (like OPEC) attempt to act as a monopoly but face incentives to cheat."
        }
      ]
    },
    notes: {
      quick: "Perfect comp: many firms, identical products, P=MR=MC, zero long-run profit, efficient. Monopoly: one firm, MR<P (must lower price on all units), P>MC, DWL, price discriminates if possible. Monopolistic comp: differentiated products, many firms, zero long-run profit but P>MC and excess capacity. Oligopoly: few firms, strategic, game theory (Nash eq, prisoner's dilemma, Cournot, Bertrand).",
      standard: "Why MR < P for monopolist: MR = P + Q·(dP/dQ). Since demand slopes down (dP/dQ < 0), MR < P. The gap between P and MR depends on elasticity: MR = P(1 - 1/|e|). Deadweight loss from monopoly: the triangle between competitive quantity (where P=MC) and monopoly quantity (where MR=MC), bounded by demand and MC. Natural monopoly: one firm can supply entire market at lower cost than multiple firms (due to economies of scale) — regulated rather than broken up. Cartel instability: each member has incentive to cheat by producing more than quota. The cartel maximises joint profit where ΣMR = ΣMC, but individual incentives push members toward Cournot behaviour.",
      deep: "Lerner Index: L = (P-MC)/P = -1/εd, measuring market power. Perfect competition: L=0. Monopoly: L>0, higher when demand is more inelastic. Cournot model: n firms choose quantities qi simultaneously. Market demand P = a - bQ where Q = Σqi. Firm i maximises πi = (a - bQ)qi - c(qi). FOC: a - bQ - bqi - c'(qi) = 0. Symmetric equilibrium: each produces (a-c)/[b(n+1)]. As n→∞, approaches competitive outcome. Bertrand paradox: with homogeneous products and constant MC, two firms are enough to drive price to MC (competitive outcome). Differentiated products (Hotelling) soften price competition. Kinked demand curve: rivals match price cuts but ignore price rises, creating a kink at current price and discontinuity in MR that explains price rigidity.",
      exam: "(1) Draw monopoly diagram: D, MR, MC, ATC. Show profit-max Q where MR=MC, price on D above. Shade profit rectangle: (P-ATC)×Q. Shade DWL triangle. (2) Compare perfect comp and monopoly side by side. (3) Calculate monopoly profit from table data. (4) Prisoner's dilemma payoff matrix: identify dominant strategies and Nash equilibrium. (5) Why is cartel unstable? Each firm has incentive to cheat — individually rational to produce more than quota. (6) Third-degree price discrimination: charge lower price to elastic market segment. (7) Natural monopoly diagram: LRAC still falling when it crosses demand — one firm is cost-efficient. Common 10-mark question: 'Compare perfect competition and monopoly using diagrams, explaining efficiency implications.' Must show: both diagrams, P and Q for each, consumer and producer surplus, DWL in monopoly, explanation of productive and allocative efficiency."
    }
  },
  {
    id: 7,
    title: "Externalities and Market Failure",
    topics: ["Negative Externalities", "Positive Externalities", "Public Goods", "Common Resources", "Government Intervention"],
    learningObjectives: [
      "Define externalities and explain why they cause market failure",
      "Draw diagrams showing external costs and benefits",
      "Calculate deadweight loss from externalities",
      "Distinguish public goods from private goods",
      "Evaluate government solutions to market failure"
    ],
    content: {
      summary: "Markets fail when private costs or benefits differ from social costs or benefits. This week covers the causes of market failure and potential remedies.",
      sections: [
        {
          title: "Negative Externalities",
          body: "A negative externality occurs when a firm's or consumer's action imposes costs on third parties. Example: pollution from a factory affects local residents. Private cost < Social cost. The market produces too much relative to the social optimum because firms ignore external costs. Social optimum: where demand (marginal social benefit) equals marginal social cost (MSC = MPC + MEC). The market produces where demand equals MPC, resulting in overproduction and deadweight loss. Solutions: Pigouvian tax equal to MEC at optimal quantity, tradable permits, regulation."
        },
        {
          title: "Positive Externalities",
          body: "A positive externality occurs when an action benefits third parties. Example: education creates benefits for society beyond the individual (lower crime, higher productivity, better civic participation). Private benefit < Social benefit. The market produces too little because individuals ignore external benefits. Social optimum: where MSC equals marginal social benefit (MSB = MPB + MEB). The market produces where MPC equals MPB, resulting in underproduction. Solutions: subsidies equal to MEB at optimal quantity, government provision, mandates."
        },
        {
          title: "Public Goods",
          body: "Public goods have two key characteristics: non-excludable (cannot prevent anyone from consuming) and non-rivalrous (one person's consumption does not reduce availability to others). Examples: national defence, street lighting, clean air. The free-rider problem: because people cannot be excluded, they have no incentive to pay — everyone waits for others to contribute. Markets underprovide public goods because private firms cannot charge consumers. Government provision through taxation is the typical solution."
        },
        {
          title: "Common Resources",
          body: "Common resources are rivalrous but non-excludable. Examples: fish stocks, public grazing land, clean water. The tragedy of the commons: because resources are non-excludable, everyone has access; because they are rivalrous, overuse depletes them. Each user benefits fully from their use but bears only a fraction of the cost, leading to overconsumption. Solutions: privatisation, regulation (quotas, limits), tradable permits, community management."
        },
        {
          title: "Government Solutions",
          body: "Pigouvian taxes: set tax equal to marginal external cost at the efficient quantity. This internalises the externality — the polluter now faces the full social cost. Tradable permits: government sets total pollution cap and allocates permits; firms trade permits, achieving abatement at lowest cost (Coase theorem conditions: well-defined property rights and low transaction costs). Subsidies for positive externalities. Regulation (command-and-control): direct limits on pollution. Each approach has strengths and weaknesses; economists generally prefer market-based mechanisms (taxes, permits) because they achieve targets at minimum cost."
        }
      ]
    },
    notes: {
      quick: "Externalities = costs/benefits affecting third parties. Negative: social cost > private cost → overproduction. Positive: social benefit > private benefit → underproduction. Public goods: non-excludable + non-rivalrous → free-rider problem → underprovision. Common resources: rivalrous + non-excludable → tragedy of commons → overuse. Solutions: taxes (negative), subsidies (positive), permits, regulation, privatisation.",
      standard: "The Coase theorem states that if property rights are well-defined and transaction costs are low, private bargaining will achieve the efficient outcome regardless of initial rights allocation. In practice, transaction costs are often high (many affected parties, information asymmetries, free-riding in bargaining), so government intervention may be needed. The optimal Pigouvian tax equals the marginal external cost at the efficient quantity — not the average or total externality. With tradable permits, firms with low abatement costs sell permits; firms with high abatement costs buy permits. The equilibrium permit price equals the marginal abatement cost. This is cost-effective: total abatement is achieved at minimum total cost.",
      deep: "Social welfare maximisation: max W = CS + PS - D(E), where D(E) is damage from emissions E. FOC yields MSB = MSC. With externalities, the competitive equilibrium is not Pareto efficient. The Lindahl equilibrium for public goods: each individual pays a personalised price (Lindahl tax) equal to their marginal benefit, summing to MC. Implementation requires knowledge of preferences, which is the fundamental problem of public goods provision. The Clarke-Groves mechanism provides incentive-compatible revelation but is rarely used in practice. For common resources, Ostrom's work shows that communities can self-manage resources through rules, monitoring, and sanctions when certain design principles are met. The second-best problem: when multiple distortions exist, correcting one may not improve welfare (Lipsey-Lancaster theorem).",
      exam: "(1) Draw negative externality diagram: MPC, MSC, demand. Show market quantity (MPC=D) > social optimum (MSC=D). Shade DWL triangle. (2) Draw positive externality: MPB, MSB, supply. Show market quantity < social optimum. Shade DWL. (3) Free-rider problem: why markets underprovide public goods — non-excludability means no profit incentive. (4) Tragedy of the commons: explain overuse of common resources. (5) Evaluate Pigouvian tax vs tradable permits: taxes fix price (uncertain quantity), permits fix quantity (uncertain price). Permits more efficient when abatement costs differ across firms. (6) Coase theorem: conditions and limitations. Common 8-mark: 'Using a diagram, explain why a negative externality leads to market failure and evaluate a government policy to correct it.' Must include: correct diagram with all curves labelled, explanation of overproduction, identification of DWL, one policy explanation with evaluation (e.g., 'Tax is efficient but requires accurate measurement of MEC')."
    }
  },
  {
    id: 8,
    title: "Game Theory",
    topics: ["Nash Equilibrium", "Prisoner's Dilemma", "Dominant Strategies", "Mixed Strategies", "Repeated Games"],
    learningObjectives: [
      "Construct a payoff matrix for a two-player game",
      "Identify dominant strategies and Nash equilibria",
      "Explain the prisoner's dilemma and its real-world applications",
      "Analyse repeated games and the role of cooperation",
      "Calculate expected payoffs in mixed strategy games"
    ],
    content: {
      summary: "Game theory analyses strategic interaction where the outcome for each participant depends on the choices of all. It is essential for understanding oligopoly, bargaining, and cooperation.",
      sections: [
        {
          title: "Nash Equilibrium",
          body: "A Nash equilibrium is a set of strategies, one for each player, such that no player can benefit by unilaterally changing their strategy. In other words: each player's choice is optimal given what the others are doing. Nash equilibrium does not require the best collective outcome — it only requires individual rationality. A game may have zero, one, or multiple Nash equilibria."
        },
        {
          title: "Prisoner's Dilemma",
          body: "Two suspects are arrested. If both stay silent (cooperate), each gets 1 year. If one betrays (defects) and the other stays silent, the betrayer goes free and the silent one gets 10 years. If both betray, each gets 5 years. Individually, betraying is always better regardless of what the other does (dominant strategy). But both betraying (5 years each) is worse than both cooperating (1 year each). This illustrates why individually rational choices can lead to collectively inferior outcomes. Real-world applications: oligopoly pricing, arms races, environmental agreements, public goods provision."
        },
        {
          title: "Dominant and Dominated Strategies",
          body: "A dominant strategy is one that yields a higher payoff than any other strategy, regardless of what the opponent does. A dominated strategy always yields a lower payoff than some other strategy. Rational players never play dominated strategies. If every player has a dominant strategy, their combination is a Nash equilibrium. Many games have no dominant strategies — Nash equilibrium must be found by checking each strategy profile."
        },
        {
          title: "Mixed Strategies",
          body: "When no pure strategy Nash equilibrium exists, players may randomise. A mixed strategy assigns probabilities to each pure strategy. In equilibrium, each player chooses probabilities that make the other player indifferent between their pure strategies. Example: Matching Pennies. Player A wins if coins match; Player B wins if they differ. No pure strategy equilibrium exists. Each player plays Heads 50% and Tails 50%. Expected payoff for each is zero."
        },
        {
          title: "Repeated Games",
          body: "In finitely repeated games with a known end, backward induction leads to the same outcome as the one-shot game (defection in prisoner's dilemma). In infinitely or indefinitely repeated games, cooperation can be sustained through trigger strategies like Tit-for-Tat (cooperate first, then mimic opponent's previous move). The folk theorem states that in infinitely repeated games, any feasible and individually rational payoff can be supported as a Nash equilibrium if players are sufficiently patient. Factors supporting cooperation: repeated interaction, ability to monitor, punishment credibility, low discount rates (patient players value future cooperation)."
        }
      ]
    },
    notes: {
      quick: "Nash eq: no player wants to deviate unilaterally. Prisoner's dilemma: dominant strategy = defect, but mutual cooperation is better. Dominant strategy is best regardless of opponent. Dominated strategy is never played. Mixed strategy: randomise when no pure eq exists. Repeated games: cooperation possible with trigger strategies (tit-for-tat). Folk theorem: many equilibria possible in infinite games.",
      standard: "To find Nash equilibrium in a 2×2 game: check each cell. Is either player better off switching? If neither is, it's a Nash equilibrium. A game can have multiple Nash equilibria (coordination games like Battle of the Sexes) or none in pure strategies (Matching Pennies). In the prisoner's dilemma, defection is a dominant strategy, so (Defect, Defect) is the unique Nash equilibrium — but it is Pareto inefficient. In Cournot duopoly, each firm's quantity choice is a best response to the other's, forming a Nash equilibrium. Tit-for-tat works because: it is nice (starts cooperative), retaliatory (punishes defection), forgiving (returns to cooperation after punishment), and clear (opponent understands the strategy).",
      deep: "Normal form games: G = {N, {Si}, {ui}} where N is players, Si is strategy sets, ui is payoff functions. Best response correspondence BRi(s_-i) = argmax ui(si, s_-i). Nash equilibrium: si* ∈ BRi(s_*_-i) for all i. Existence (Nash 1950): Every finite game has at least one Nash equilibrium in mixed strategies. The proof uses Brouwer's fixed point theorem on the best response correspondence. Subgame perfect equilibrium (Selten): eliminates non-credible threats by requiring Nash equilibrium in every subgame. Backward induction in finite games. Evolutionary game theory: strategies as traits, payoffs as fitness, Nash equilibrium as evolutionarily stable strategy (ESS). Bayesian games (Harsanyi): incomplete information modelled as types with probability distributions. Mechanism design: design games (auctions, voting rules) to achieve desired social outcomes despite private information — the revelation principle states any mechanism can be transformed into an incentive-compatible direct mechanism.",
      exam: "(1) Construct payoff matrix from description and find Nash equilibrium. (2) Prisoner's dilemma: identify dominant strategies, find Nash eq, explain why it's inefficient. (3) Coordination game (Battle of the Sexes): find two pure strategy Nash equilibria and one mixed strategy equilibrium. (4) Oligopoly as prisoner's dilemma: two firms choosing High Price or Low Price. Show that Low Price is dominant and Nash eq is both choosing Low Price (prisoner's dilemma for firms). (5) Repeated game: explain how cooperation can be sustained in infinitely repeated prisoner's dilemma with discount factor δ > critical value. (6) Calculate mixed strategy probabilities: set expected payoff of opponent's strategies equal. Common 6-mark: 'Two firms choose High or Low price. The payoff matrix is... (a) Find dominant strategies. (b) Find Nash equilibrium. (c) Is this a prisoner's dilemma? Explain.' Answer: (a) Check each strategy — if one always yields higher payoff regardless of opponent, it's dominant. (b) Strategy pair where neither wants to deviate. (c) Yes if individually rational outcome is worse than mutual cooperation."
    }
  }
];

export const sampleSubject = {
  id: "ecc1000",
  name: "Principles of Microeconomics",
  code: "ECC1000",
  weeks: weekContents.map(w => ({ id: w.id, title: w.title, topics: w.topics, learningObjectives: w.learningObjectives })),
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
