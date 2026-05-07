const flashcardData = {
    maths: {
        name: 'Mathematics',
        flashcards: [
            { question: 'What is the derivative of x²?', answer: '2x', explanation: 'The derivative of xⁿ is nx^(n-1). For x², n=2, so derivative is 2x^(2-1) = 2x.', example: 'If f(x) = x², then f\'(x) = 2x. At x=3, the slope is 6.' },
            { question: 'What is the value of π (pi) to 3 decimal places?', answer: '3.142', explanation: 'Pi is the ratio of a circle\'s circumference to its diameter. It is an irrational number.', example: 'Circumference of a circle with radius 5: C = 2πr = 2 × 3.142 × 5 = 31.42' },
            { question: 'Solve: 2x + 5 = 15', answer: 'x = 5', explanation: 'Subtract 5 from both sides: 2x = 10. Divide by 2: x = 5.', example: '2(5) + 5 = 10 + 5 = 15 ✓' },
            { question: 'What is the area of a circle with radius r?', answer: 'πr²', explanation: 'The area enclosed by a circle is π multiplied by the radius squared.', example: 'Area of circle with radius 4: A = π(4)² = 16π ≈ 50.27' },
            { question: 'What is the Pythagorean theorem?', answer: 'a² + b² = c²', explanation: 'In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides.', example: 'If a=3, b=4, then c² = 9 + 16 = 25, so c=5' },
            { question: 'What is the limit as x approaches 0 of sin(x)/x?', answer: '1', explanation: 'Using L\'Hospital\'s rule or squeeze theorem, this limit equals 1.', example: 'sin(0.1)/0.1 ≈ 0.9983/0.1 ≈ 0.998 ≈ 1' },
            { question: 'What is the formula for compound interest?', answer: 'A = P(1 + r/n)^(nt)', explanation: 'A=amount, P=principal, r=rate, n=compounds/year, t=time in years.', example: '£1000 at 5% for 2 years: A = 1000(1.05)² = £1102.50' },
            { question: 'Solve: log₂(8) = ?', answer: '3', explanation: 'log_b(a) = c means b^c = a. 2³ = 8, so log₂(8) = 3.', example: 'log₁₀(100) = 2 because 10² = 100' },
            { question: 'What is the discriminant of ax² + bx + c = 0?', answer: 'b² - 4ac', explanation: 'The discriminant determines the nature of roots: positive=2 real, zero=1 real, negative=2 complex.', example: 'For x² - 5x + 6=0: D=25-24=1>0, two real roots' },
            { question: 'What is the sum of angles in a triangle?', answer: '180°', explanation: 'The sum of interior angles in any triangle is always 180 degrees.', example: 'Right-angled triangle: 90° + 30° + 60° = 180°' },
            { question: 'What is the derivative of e^x?', answer: 'e^x', explanation: 'The exponential function e^x is its own derivative.', example: 'If f(x) = e^(2x), then f\'(x) = 2e^(2x)' },
            { question: 'What is the integral of 1/x dx?', answer: 'ln|x| + C', explanation: 'The antiderivative of 1/x is the natural logarithm of the absolute value of x.', example: '∫(1/x)dx from 1 to e = ln(e) - ln(1) = 1 - 0 = 1' },
            { question: 'What is the formula for the nth term of an arithmetic sequence?', answer: 'aₙ = a₁ + (n-1)d', explanation: 'aₙ=nth term, a₁=first term, d=common difference.', example: 'Sequence 3,7,11,...: a₅ = 3 + 4(4) = 19' },
            { question: 'What is the probability of rolling a 6 on a fair die?', answer: '1/6', explanation: 'Probability = favorable outcomes / total outcomes = 1/6.', example: 'Probability of even number: 3/6 = 1/2' },
            { question: 'What is the mean of the numbers: 2, 4, 6, 8, 10?', answer: '6', explanation: 'Mean = sum of numbers / count = 30/5 = 6.', example: 'Mean of 1,2,3: (1+2+3)/3 = 2' },
            { question: 'What is the gradient of the line y = 3x + 5?', answer: '3', explanation: 'In y = mx + c, m is the gradient (slope) of the line.', example: 'y = -2x + 7 has gradient -2, going downhill' },
            { question: 'Solve: x² - 9 = 0', answer: 'x = 3 or x = -3', explanation: 'Factor as (x-3)(x+3)=0, so x=3 or x=-3.', example: 'x² - 16 = 0 → x=4 or x=-4' },
            { question: 'What is the formula for the volume of a sphere?', answer: '(4/3)πr³', explanation: 'Volume enclosed by a sphere with radius r.', example: 'Sphere with radius 3: V = (4/3)π(27) = 36π ≈ 113.1' },
            { question: 'What is the value of sin(90°)?', answer: '1', explanation: 'Sine of 90 degrees is 1, representing maximum value on unit circle.', example: 'sin(0°)=0, sin(90°)=1, sin(180°)=0' },
            { question: 'What is cos(0°)?', answer: '1', explanation: 'Cosine of 0 degrees is 1, starting point on unit circle.', example: 'cos(90°)=0, cos(180°)=-1, cos(360°)=1' },
            { question: 'What is tan(45°)?', answer: '1', explanation: 'Tangent = sine/cosine. At 45°, sin=cos=√2/2, so tan=1.', example: 'tan(0°)=0, tan(90°) is undefined' },
            { question: 'What is the sum of the first n natural numbers?', answer: 'n(n+1)/2', explanation: 'Formula for summing 1+2+...+n.', example: 'Sum 1-10: 10×11/2 = 55' },
            { question: 'What is the mode of: 2, 3, 3, 4, 5, 5, 5?', answer: '5', explanation: 'Mode is the most frequently occurring value.', example: 'Mode of 1,2,2,3,3,3: 3' },
            { question: 'What is the median of: 1, 3, 5, 7, 9?', answer: '5', explanation: 'Median is the middle value when sorted.', example: 'Median of 2,4,6,8: (4+6)/2 = 5' },
            { question: 'What is the range of: 2, 5, 8, 11, 14?', answer: '12', explanation: 'Range = max - min = 14 - 2 = 12.', example: 'Range of 10,20,30,40: 40-10=30' },
            { question: 'What is the formula for the area of a trapezium?', answer: '½(a+b)h', explanation: 'a and b are the two parallel sides, h is height.', example: 'a=4, b=6, h=3: A=½(10)×3=15' },
            { question: 'What is the formula for the surface area of a cylinder?', answer: '2πr(r + h)', explanation: 'Includes two circular ends plus lateral surface area.', example: 'r=2, h=5: SA=2π×2×7=28π≈87.96' },
            { question: 'What is the nth term of the sequence: 2, 5, 8, 11...?', answer: '3n - 1', explanation: 'Common difference is 3, first term 2: 3n - 1.', example: 'n=10: 3(10)-1=29' },
            { question: 'What is the inverse of f(x) = 2x + 3?', answer: 'f⁻¹(x) = (x - 3)/2', explanation: 'Swap x and y, solve for y: x=2y+3 → y=(x-3)/2.', example: 'f(5)=13, f⁻¹(13)=5' },
            { question: 'What is the value of log₁₀(1000)?', answer: '3', explanation: 'log₁₀(10³)=3, since 10³=1000.', example: 'log₁₀(100)=2, log₁₀(1)=0' },
            { question: 'What is the formula for binomial expansion?', answer: '(a + b)ⁿ = Σ(nCr)a^(n-r)b^r', explanation: 'Expands (a+b)ⁿ using combinations. nCr = n!/(r!(n-r)!).', example: '(a+b)² = a² + 2ab + b²' }
        ]
    },
    physics: {
        name: 'Physics',
        flashcards: [
            { question: 'What is Newton\'s first law of motion also known as?', answer: 'Law of inertia' },
            { question: 'What is the relationship between angular velocity and linear velocity?', answer: 'v = rω (linear velocity = radius × angular velocity)' },
            { question: 'What is the principle of moments?', answer: 'Sum of clockwise moments = sum of anticlockwise moments' },
            { question: 'What is the formula for centripetal force?', answer: 'F = mv²/r' },
            { question: 'What is torque?', answer: 'τ = r × F (force × perpendicular distance)' },
            { question: 'What is the law of conservation of angular momentum?', answer: 'Total angular momentum remains constant if no external torque' },
            { question: 'What is simple harmonic motion?', answer: 'Motion where acceleration is proportional to displacement and opposite in direction' },
            { question: 'What is the formula for period of a simple pendulum?', answer: 'T = 2π√(l/g)' },
            { question: 'What is damping?', answer: 'Reduction in amplitude due to resistive forces' },
            { question: 'What is resonance?', answer: 'Maximum amplitude when driving frequency equals natural frequency' },
            { question: 'What is the difference between longitudinal and transverse waves?', answer: 'Longitudinal: particles parallel to wave direction; Transverse: particles perpendicular' },
            { question: 'What is the principle of superposition?', answer: 'Resultant displacement is sum of individual displacements' },
            { question: 'What is constructive interference?', answer: 'Waves reinforce, amplitude increases' },
            { question: 'What is destructive interference?', answer: 'Waves cancel, amplitude decreases' },
            { question: 'What is the formula for refractive index?', answer: 'n = c/v (speed of light in vacuum / speed in medium)' },
            { question: 'What is Snell\'s law?', answer: 'n₁sinθ₁ = n₂sinθ₂' },
            { question: 'What is the critical angle?', answer: 'Angle where refracted light is parallel to boundary' },
            { question: 'What is polarization?', answer: 'Restricting wave oscillations to one plane' },
            { question: 'What is Malus\' law?', answer: 'I = I₀cos²θ' },
            { question: 'What is Coulomb\'s law?', answer: 'F = k(q₁q₂)/r²' },
            { question: 'What is electric field strength?', answer: 'E = F/q (force per unit charge)' },
            { question: 'What is electric potential?', answer: 'V = W/q (work done per unit charge)' },
            { question: 'What is capacitance?', answer: 'C = Q/V (charge per unit voltage)' },
            { question: 'What is the time constant of an RC circuit?', answer: 'τ = RC' },
            { question: 'What is Kirchhoff\'s first law?', answer: 'Sum of currents entering junction = sum leaving' },
            { question: 'What is Kirchhoff\'s second law?', answer: 'Sum of EMFs = sum of potential drops around loop' },
            { question: 'What is the formula for magnetic flux?', answer: 'Φ = BAcosθ' },
            { question: 'What is Faraday\'s law of electromagnetic induction?', answer: 'Induced EMF = -dΦ/dt' },
            { question: 'What is Lenz\'s law?', answer: 'Induced current opposes change producing it' },
            { question: 'What is the formula for induced EMF in a moving conductor?', answer: 'ε = Blv' },
            { question: 'What is root mean square (rms) value?', answer: 'Value of DC that produces same power as AC' },
            { question: 'What is the transformer equation?', answer: 'V₁/V₂ = N₁/N₂' },
            { question: 'What is the photoelectric effect?', answer: 'Electrons emitted when light of sufficient frequency hits metal' },
            { question: 'What is Planck\'s equation?', answer: 'E = hf' },
            { question: 'What is de Broglie wavelength?', answer: 'λ = h/p (h = Planck\'s constant, p = momentum)' },
            { question: 'What is Heisenberg\'s uncertainty principle?', answer: 'Cannot know both position and momentum precisely' }
        ]
    },
    chemistry: {
        name: 'Chemistry',
        flashcards: [
            { question: 'What is Avogadro\'s number?', answer: '6.022 × 10²³ mol⁻¹' },
            { question: 'What is the pH of pure water at 25°C?', answer: '7' },
            { question: 'What is the periodic table arranged by?', answer: 'Atomic number (number of protons)' },
            { question: 'What is the chemical symbol for gold?', answer: 'Au' },
            { question: 'What is the formula for methane?', answer: 'CH₄' },
            { question: 'What is oxidation?', answer: 'Loss of electrons or increase in oxidation state' },
            { question: 'What is the ideal gas law?', answer: 'PV = nRT' },
            { question: 'What is the difference between exothermic and endothermic reactions?', answer: 'Exothermic releases heat; endothermic absorbs heat' },
            { question: 'What is a catalyst?', answer: 'Substance that speeds up reaction without being consumed' },
            { question: 'What is the electron configuration of carbon?', answer: '1s² 2s² 2p²' },
            { question: 'What is the formula for sulfuric acid?', answer: 'H₂SO₄' },
            { question: 'What is Le Chatelier\'s principle?', answer: 'System at equilibrium responds to stress to re-establish equilibrium' },
            { question: 'What is the molar mass of water?', answer: '18 g/mol' },
            { question: 'What is a covalent bond?', answer: 'Bond formed by sharing of electrons' },
            { question: 'What is the formula for sodium chloride?', answer: 'NaCl' },
            { question: 'What is reduction?', answer: 'Gain of electrons or decrease in oxidation state' },
            { question: 'What is ionic bonding?', answer: 'Bond formed by transfer of electrons between atoms' },
            { question: 'What is the formula for hydrochloric acid?', answer: 'HCl' },
            { question: 'What is the formula for nitric acid?', answer: 'HNO₃' },
            { question: 'What is the chemical symbol for iron?', answer: 'Fe' },
            { question: 'What is the chemical symbol for silver?', answer: 'Ag' },
            { question: 'What is the formula for ethanol?', answer: 'C₂H₅OH' },
            { question: 'What is the formula for carbon dioxide?', answer: 'CO₂' },
            { question: 'What is the formula for ammonia?', answer: 'NH₃' },
            { question: 'What is the formula for glucose?', answer: 'C₆H₁₂O₆' },
            { question: 'What is the formula for calcium carbonate?', answer: 'CaCO₃' },
            { question: 'What is the atomic number of carbon?', answer: '6' },
            { question: 'What is the atomic number of oxygen?', answer: '8' },
            { question: 'What is the atomic number of hydrogen?', answer: '1' },
            { question: 'What is the formula for hydrogen peroxide?', answer: 'H₂O₂' },
            { question: 'What is the formula for potassium hydroxide?', answer: 'KOH' },
            { question: 'What is the formula for magnesium oxide?', answer: 'MgO' },
            { question: 'What is the formula for aluminum oxide?', answer: 'Al₂O₃' }
        ]
    },
    biology: {
        name: 'Biology',
        flashcards: [
            { question: 'What is the basic unit of life?', answer: 'Cell' },
            { question: 'What is the process by which plants make food?', answer: 'Photosynthesis' },
            { question: 'What is DNA stand for?', answer: 'Deoxyribonucleic Acid' },
            { question: 'What is the function of mitochondria?', answer: 'Produce energy (ATP) for the cell' },
            { question: 'What is the process of cell division called?', answer: 'Mitosis (somatic cells) or Meiosis (gametes)' },
            { question: 'What is the role of chlorophyll?', answer: 'Absorb light energy for photosynthesis' },
            { question: 'What is the difference between aerobic and anaerobic respiration?', answer: 'Aerobic uses oxygen; anaerobic does not' },
            { question: 'What is the function of enzymes?', answer: 'Biological catalysts that speed up chemical reactions' },
            { question: 'What is the structure of DNA?', answer: 'Double helix' },
            { question: 'What is homeostasis?', answer: 'Maintenance of stable internal environment' },
            { question: 'What is the function of red blood cells?', answer: 'Transport oxygen throughout the body' },
            { question: 'What is natural selection?', answer: 'Process where organisms with favorable traits survive and reproduce' },
            { question: 'What is the function of ribosomes?', answer: 'Protein synthesis' },
            { question: 'What is the difference between prokaryotic and eukaryotic cells?', answer: 'Prokaryotes lack nucleus; eukaryotes have nucleus' },
            { question: 'What is the function of ATP?', answer: 'Energy currency of the cell' },
            { question: 'What is the formula for photosynthesis?', answer: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
            { question: 'What is the function of chloroplasts?', answer: 'Site of photosynthesis in plant cells' },
            { question: 'What is the function of the nucleus?', answer: 'Contains DNA and controls cell activities' },
            { question: 'What is the function of the cell membrane?', answer: 'Controls what enters and leaves the cell' },
            { question: 'What is the function of the cell wall?', answer: 'Supports and protects plant cells' },
            { question: 'What is diffusion?', answer: 'Movement of particles from high to low concentration' },
            { question: 'What is osmosis?', answer: 'Movement of water across a semipermeable membrane' },
            { question: 'What is active transport?', answer: 'Movement of particles against concentration gradient, requires energy' },
            { question: 'What is the function of white blood cells?', answer: 'Fight infections and diseases' },
            { question: 'What is the function of platelets?', answer: 'Help in blood clotting' },
            { question: 'What is the function of arteries?', answer: 'Carry oxygenated blood away from the heart' },
            { question: 'What is the function of veins?', answer: 'Carry deoxygenated blood back to the heart' },
            { question: 'What is the function of capillaries?', answer: 'Allow exchange of substances between blood and cells' },
            { question: 'What is the function of the heart?', answer: 'Pump blood around the body' },
            { question: 'What is the function of the lungs?', answer: 'Gas exchange - oxygen in, carbon dioxide out' },
            { question: 'What is the function of the kidneys?', answer: 'Filter waste products from blood' },
            { question: 'What is the function of the liver?', answer: 'Detoxification and metabolism' },
            { question: 'What is the function of the small intestine?', answer: 'Absorption of nutrients' },
            { question: 'What is the function of the large intestine?', answer: 'Absorption of water and formation of feces' }
        ]
    },
    history: {
        name: 'History',
        flashcards: [
            { question: 'What was the impact of the Treaty of Versailles on Germany?', answer: 'Imposed reparations, territorial losses, war guilt clause' },
            { question: 'What were the main causes of World War I?', answer: 'Militarism, alliances, imperialism, nationalism, assassination of Franz Ferdinand' },
            { question: 'What was the significance of the Battle of Stalingrad?', answer: 'Turning point in WWII; first major German defeat' },
            { question: 'What was the Marshall Plan?', answer: 'US economic aid to Europe post-WWII to prevent communism' },
            { question: 'What was the Cuban Missile Crisis?', answer: '1962 standoff between US and USSR over nuclear missiles' },
            { question: 'What were the causes of the French Revolution?', answer: 'Social inequality, economic crisis, political corruption' },
            { question: 'What was the Enlightenment?', answer: 'Intellectual movement emphasizing reason and individualism' },
            { question: 'What was the significance of the Magna Carta?', answer: 'Established principle of limited government' },
            { question: 'What was the Industrial Revolution\'s impact on society?', answer: 'Urbanization, social class changes, technological innovation' },
            { question: 'What was the Scramble for Africa?', answer: 'European colonization of Africa in late 19th century' },
            { question: 'What was the significance of the Berlin Wall?', answer: 'Symbol of Cold War division; fell in 1989' },
            { question: 'What was the policy of appeasement?', answer: 'Britain/France giving in to Hitler to avoid war' },
            { question: 'What was the League of Nations?', answer: 'First international organization for collective security' },
            { question: 'What was the impact of the Black Death on Europe?', answer: 'Population decline, economic changes, social upheaval' },
            { question: 'What was the Renaissance?', answer: 'Cultural rebirth in Europe (14th-17th century)' },
            { question: 'What was the Protestant Reformation?', answer: 'Religious movement challenging Catholic Church authority' },
            { question: 'What was the significance of the Battle of Waterloo?', answer: 'Napoleon\'s final defeat, ended Napoleonic Wars' },
            { question: 'What was the Opium War?', answer: 'British wars with China over opium trade (1839-1842, 1856-1860)' },
            { question: 'What was the Boxer Rebellion?', answer: 'Chinese uprising against foreign influence (1899-1901)' },
            { question: 'What was the Indian Independence Movement?', answer: 'Movement led by Gandhi for Indian independence from Britain' },
            { question: 'What was the Cold War?', answer: 'Geopolitical tension between USA and USSR (1947-1991)' },
            { question: 'What was the Vietnam War?', answer: 'Conflict between North and South Vietnam, US involvement' },
            { question: 'What was the Civil Rights Act of 1964?', answer: 'Prohibited discrimination based on race, color, religion, sex' },
            { question: 'What was the feminist movement\'s goals?', answer: 'Gender equality, reproductive rights, workplace equality' },
            { question: 'What was the fall of the Soviet Union?', answer: 'USSR dissolved in 1991, end of Cold War' },
            { question: 'Who was Marie Antoinette?', answer: 'Queen of France during the French Revolution' },
            { question: 'What was the Bastille?', answer: 'Prison stormed during the French Revolution' },
            { question: 'Who was Napoleon Bonaparte?', answer: 'French military leader and Emperor' },
            { question: 'When was the Great Wall of China built?', answer: 'Over many centuries, main construction during Ming Dynasty' },
            { question: 'Who was Julius Caesar?', answer: 'Roman general and statesman' },
            { question: 'What was the Roman Empire?', answer: 'Major ancient empire centered in Rome' },
            { question: 'When did the Soviet Union collapse?', answer: '1991' },
            { question: 'What was the Cuban Missile Crisis?', answer: '1962 Cold War standoff between US and USSR' },
            { question: 'Who was Mahatma Gandhi?', answer: 'Leader of Indian independence movement' }
        ]
    },
    geography: {
        name: 'Geography',
        flashcards: [
            { question: 'What is the largest ocean?', answer: 'Pacific Ocean' },
            { question: 'What is the longest river in the world?', answer: 'Nile River' },
            { question: 'What is the process of erosion?', answer: 'Wearing away of land by natural forces' },
            { question: 'What is the greenhouse effect?', answer: 'Trapping of heat by greenhouse gases in atmosphere' },
            { question: 'What is the capital of Australia?', answer: 'Canberra' },
            { question: 'What is tectonic plate movement?', answer: 'Movement of Earth\'s crustal plates causing earthquakes/volcanoes' },
            { question: 'What is urbanization?', answer: 'Process of population moving to cities' },
            { question: 'What is the difference between weather and climate?', answer: 'Weather is short-term; climate is long-term average' },
            { question: 'What is the largest desert in the world?', answer: 'Sahara Desert' },
            { question: 'What is the water cycle?', answer: 'Continuous movement of water between Earth and atmosphere' },
            { question: 'What is deforestation?', answer: 'Clearing of forests for agriculture/development' },
            { question: 'What is a tsunami?', answer: 'Large ocean wave caused by underwater earthquake' },
            { question: 'What is the Ring of Fire?', answer: 'Area around Pacific Ocean with frequent earthquakes/volcanoes' },
            { question: 'What is the population of the world (approx.)?', answer: '8 billion' },
            { question: 'What is El Niño?', answer: 'Climate pattern causing warming of Pacific Ocean' },
            { question: 'What is the second largest ocean?', answer: 'Atlantic Ocean' },
            { question: 'What is the capital of France?', answer: 'Paris' },
            { question: 'What is the capital of Germany?', answer: 'Berlin' },
            { question: 'What is the capital of Japan?', answer: 'Tokyo' },
            { question: 'What is the capital of Brazil?', answer: 'Brasília' },
            { question: 'What is the largest continent?', answer: 'Asia' },
            { question: 'What is the smallest continent?', answer: 'Australia' },
            { question: 'What is the highest mountain?', answer: 'Mount Everest' },
            { question: 'What is the deepest ocean trench?', answer: 'Mariana Trench' },
            { question: 'What is the process of deposition?', answer: 'Dropping of sediment by natural forces' },
            { question: 'What is the process of weathering?', answer: 'Breaking down of rocks in place' },
            { question: 'What is a volcano?', answer: 'Opening in Earth\'s crust where magma erupts' },
            { question: 'What is an earthquake?', answer: 'Sudden shaking of Earth\'s crust' },
            { question: 'What is a hurricane?', answer: 'Large rotating storm with strong winds' },
            { question: 'What is a tornado?', answer: 'Violently rotating column of air' },
            { question: 'What is climate change?', answer: 'Long-term change in Earth\'s climate patterns' },
            { question: 'What is renewable energy?', answer: 'Energy from naturally replenishing sources' },
            { question: 'What is non-renewable energy?', answer: 'Energy from finite sources like fossil fuels' },
            { question: 'What is a watershed?', answer: 'Area of land where water drains to a common point' },
            { question: 'What is a delta?', answer: 'Landform at river mouth formed by sediment deposition' },
            { question: 'What is a fjord?', answer: 'Long, narrow inlet carved by glaciers' }
        ]
    },
    economics: {
        name: 'Economics',
        flashcards: [
            { question: 'What is supply and demand?', answer: 'Supply: quantity available; Demand: quantity wanted' },
            { question: 'What is GDP?', answer: 'Gross Domestic Product - total value of goods/services produced' },
            { question: 'What is inflation?', answer: 'General increase in prices over time' },
            { question: 'What is opportunity cost?', answer: 'Value of next best alternative foregone' },
            { question: 'What is the law of diminishing returns?', answer: 'Additional output decreases as more input is added' },
            { question: 'What is fiscal policy?', answer: 'Government use of spending and taxation' },
            { question: 'What is monetary policy?', answer: 'Central bank control of money supply and interest rates' },
            { question: 'What is a market economy?', answer: 'Economic system based on supply and demand' },
            { question: 'What is a monopoly?', answer: 'Single seller with no competition' },
            { question: 'What is elasticity of demand?', answer: 'Responsiveness of quantity demanded to price change' },
            { question: 'What is international trade?', answer: 'Exchange of goods/services between countries' },
            { question: 'What is unemployment?', answer: 'Number of people without jobs seeking work' },
            { question: 'What is consumer surplus?', answer: 'Difference between what consumer pays and what they would pay' },
            { question: 'What is the law of supply?', answer: 'Higher price leads to higher quantity supplied' },
            { question: 'What is a budget deficit?', answer: 'Government spending exceeds revenue' },
            { question: 'What is the law of demand?', answer: 'Higher price leads to lower quantity demanded' },
            { question: 'What is producer surplus?', answer: 'Difference between what producer receives and what they would accept' },
            { question: 'What is a perfectly competitive market?', answer: 'Many buyers/sellers, identical products, free entry/exit' },
            { question: 'What is oligopoly?', answer: 'Market dominated by few large firms' },
            { question: 'What is monopolistic competition?', answer: 'Many firms with differentiated products' },
            { question: 'What is marginal cost?', answer: 'Cost of producing one additional unit' },
            { question: 'What is marginal revenue?', answer: 'Revenue from selling one additional unit' },
            { question: 'What is average cost?', answer: 'Total cost divided by quantity produced' },
            { question: 'What is price elasticity of demand?', answer: 'Responsiveness of quantity demanded to price' },
            { question: 'What is income elasticity of demand?', answer: 'Responsiveness of demand to income change' },
            { question: 'What is cross-price elasticity?', answer: 'Responsiveness of demand to price of related good' },
            { question: 'What is a price ceiling?', answer: 'Maximum price set by government' },
            { question: 'What is a price floor?', answer: 'Minimum price set by government' },
            { question: 'What is taxation?', answer: 'Government levying charges on income, goods, services' },
            { question: 'What is subsidy?', answer: 'Government payment to support producers' },
            { question: 'What is externalities?', answer: 'Costs or benefits affecting third parties' },
            { question: 'What is public good?', answer: 'Non-rivalrous and non-excludable goods' },
            { question: 'What is merit good?', answer: 'Goods with positive externalities, underprovided by market' },
            { question: 'What is demerit good?', answer: 'Goods with negative externalities, overprovided by market' },
            { question: 'What is exchange rate?', answer: 'Price of one currency in terms of another' },
            { question: 'What is balance of payments?', answer: 'Record of all economic transactions with rest of world' }
        ]
    },
    english: {
        name: 'English',
        flashcards: [
            { question: 'What is the definition of pathetic fallacy?', answer: 'Attributing human emotions to nature/objects' },
            { question: 'What is the difference between dramatic and verbal irony?', answer: 'Dramatic: audience knows more; Verbal: opposite of what is said' },
            { question: 'What is blank verse?', answer: 'Unrhymed iambic pentameter' },
            { question: 'What is the purpose of a soliloquy in drama?', answer: 'Reveal a character\'s inner thoughts aloud' },
            { question: 'Who wrote "The Tempest"?', answer: 'William Shakespeare' },
            { question: 'What is a Petrarchan sonnet structure?', answer: 'Octave (8 lines) + Sestet (6 lines), ABBA ABBA rhyme scheme' },
            { question: 'What is stream of consciousness narration?', answer: 'Represents thoughts as they flow through the mind' },
            { question: 'What is the difference between a tragic hero and anti-hero?', answer: 'Tragic hero has fatal flaw; Anti-hero lacks heroic qualities' },
            { question: 'What is synecdoche?', answer: 'Part represents whole or vice versa' },
            { question: 'What is the effect of caesura in poetry?', answer: 'Creates pause, emphasizes emotion or meaning' },
            { question: 'Who wrote "The Waste Land"?', answer: 'T.S. Eliot' },
            { question: 'What is magical realism?', answer: 'Blends realistic narrative with magical elements' },
            { question: 'What is dramatic monologue?', answer: 'Single speaker addresses silent listener' },
            { question: 'What is the difference between denotation and connotation?', answer: 'Denotation: literal meaning; Connotation: implied meaning' },
            { question: 'What is metonymy?', answer: 'Substituting related term for actual term' },
            { question: 'Who wrote "Frankenstein"?', answer: 'Mary Shelley' },
            { question: 'What is a foil character?', answer: 'Contrasts with another character to highlight traits' },
            { question: 'What is the purpose of anaphora?', answer: 'Repetition of word/phrase at start of clauses' },
            { question: 'What is epistolary form?', answer: 'Novel written as series of letters' },
            { question: 'Who wrote "Wuthering Heights"?', answer: 'Emily Brontë' },
            { question: 'What is the difference between mood and atmosphere?', answer: 'Mood: reader\'s feeling; Atmosphere: overall feeling of text' },
            { question: 'What is enjambment?', answer: 'Line continues without pause to next line' },
            { question: 'What is a frame narrative?', answer: 'Story within a story' },
            { question: 'Who wrote "The Picture of Dorian Gray"?', answer: 'Oscar Wilde' },
            { question: 'What is the function of a chorus in Greek tragedy?', answer: 'Comment on action, provide background, express themes' },
            { question: 'What is free verse?', answer: 'Poetry without regular rhyme or meter' },
            { question: 'What is hubris in tragedy?', answer: 'Excessive pride leading to downfall' },
            { question: 'Who wrote "Waiting for Godot"?', answer: 'Samuel Beckett' },
            { question: 'What is the difference between comedy and farce?', answer: 'Comedy: humorous with happy ending; Farce: absurd, exaggerated humor' },
            { question: 'What is catharsis?', answer: 'Purging of emotions through art' },
            { question: 'Who wrote "Pygmalion"?', answer: 'George Bernard Shaw' },
            { question: 'What is intertextuality?', answer: 'Relationship between texts; references to other works' },
            { question: 'What is the purpose of a chorus in drama?', answer: 'Comment on action, provide background, express themes' },
            { question: 'What is a tragic flaw (hamartia)?', answer: 'Character defect leading to downfall' },
            { question: 'Who wrote "The Importance of Being Earnest"?', answer: 'Oscar Wilde' },
            { question: 'What is the difference between parody and satire?', answer: 'Parody: imitates style; Satire: uses humor to criticize' },
            { question: 'What is the purpose of foreshadowing?', answer: 'Hint at future events, build tension' },
            { question: 'Who wrote "A Passage to India"?', answer: 'E.M. Forster' },
            { question: 'What is the difference between first-person and third-person omniscient?', answer: 'First-person: narrator is character; Omniscient: knows all characters\' thoughts' },
            { question: 'What is resolution in narrative structure?', answer: 'Final part where conflicts are resolved' }
        ]
    }
};

let currentSubject = null;
let currentFlashcards = [];
let wrongFlashcards = [];
let currentIndex = 0;
let timer = 15;
let timerInterval = null;
let roundPoints = 0;
let totalPoints = 0;
let correctCount = 0;
let wrongCount = 0;
let consecutiveCorrect = 0;
let doublePointsActive = false;
let powerUp1Used = false;
let powerUp2Used = false;
let powerUp3Used = false;
let powerUp1RoundUsed = false;
let powerUp2RoundUsed = false;
let powerUp3RoundUsed = false;
let isRedemptionMode = false;
let lastAnswerCorrect = false;
let currentUser = { name: 'Guest', isLoggedIn: false };
let currentOptions = [];

let currentGame = null;
let isHost = false;
let gamePlayers = [];
let liveScores = {};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playCorrectSound() {
    playSound(523.25, 0.15, 'sine');
    setTimeout(() => playSound(659.25, 0.15, 'sine'), 100);
    setTimeout(() => playSound(783.99, 0.2, 'sine'), 200);
    setTimeout(() => playSound(1047, 0.25, 'sine'), 300);
}

function playWrongSound() {
    const frequencies = [150, 140, 130, 120, 110, 100];
    frequencies.forEach((freq, i) => {
        setTimeout(() => playSound(freq, 0.15, 'sawtooth'), i * 50);
    });
}

function playTimerWarning() {
    playSound(880, 0.15, 'square');
}

function playTimerBuzzer() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            playSound(440, 0.1, 'square');
            playSound(220, 0.1, 'sawtooth');
        }, i * 200);
    }
}

function playBankSound() {
    playSound(800, 0.15);
    setTimeout(() => playSound(900, 0.15), 100);
    setTimeout(() => playSound(1000, 0.15), 200);
    setTimeout(() => playSound(1100, 0.2), 300);
}

function playCheerSound() {
    const cheerFrequencies = [440, 554, 659, 880, 659, 554, 440];
    cheerFrequencies.forEach((freq, i) => {
        setTimeout(() => playSound(freq, 0.1, 'triangle'), i * 80);
    });
    
    setTimeout(() => {
        playSound(523, 0.1, 'sine');
        playSound(659, 0.1, 'sine');
        playSound(784, 0.15, 'sine');
    }, 600);
}

function playLoudCheer() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1200, 1046.50, 783.99, 659.25];
    notes.forEach((freq, i) => {
        setTimeout(() => playSound(freq, 0.15, 'sine'), i * 80);
    });
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            playSound(800 + Math.random() * 200, 0.05, 'sawtooth');
        }, 500 + i * 50);
    }
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'];
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        if (!confetti.classList.contains('triangle')) {
            confetti.style.background = color;
        } else {
            confetti.style.borderBottomColor = color;
        }
        
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
}

function showSubjects() {
    showSection('subjects');
}

function goHome() {
    showSection('home');
}

function selectSubject(subjectId) {
    currentSubject = subjectId;
    currentFlashcards = [...flashcardData[subjectId].flashcards];
    shuffleArray(currentFlashcards);
    currentIndex = 0;
    roundPoints = 0;
    correctCount = 0;
    wrongCount = 0;
    consecutiveCorrect = 0;
    doublePointsActive = false;
    powerUp1Used = false;
    powerUp2Used = false;
    powerUp3Used = false;
    powerUp1RoundUsed = false;
    powerUp2RoundUsed = false;
    powerUp3RoundUsed = false;
    
    document.getElementById('game-subject').textContent = flashcardData[subjectId].name;
    document.getElementById('current-question').textContent = '1';
    document.getElementById('total-questions').textContent = currentFlashcards.length;
    document.getElementById('round-points').textContent = '0';
    
    resetTimer();
    loadFlashcard();
    showSection('game');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadFlashcard() {
    if (currentIndex >= currentFlashcards.length) {
        endGame();
        return;
    }
    
    const flashcard = currentFlashcards[currentIndex];
    document.getElementById('question').textContent = flashcard.question;
    document.getElementById('answer').textContent = flashcard.answer;
    
    if (flashcard.explanation) {
        document.getElementById('explanation').textContent = `💡 ${flashcard.explanation}`;
    } else {
        document.getElementById('explanation').textContent = '';
    }
    
    if (flashcard.example) {
        document.getElementById('example').textContent = `📝 ${flashcard.example}`;
    } else {
        document.getElementById('example').textContent = '';
    }
    
    const flashcardElement = document.getElementById('flashcard');
    flashcardElement.classList.remove('flipped');
    
    powerUp1Used = false;
    powerUp2Used = false;
    powerUp3Used = false;
    
    generateOptions(flashcard);
    resetOptionButtons();
    updatePowerUpButtons();
}

function generateOptions(currentFlashcard) {
    const correctAnswer = currentFlashcard.answer;
    const allAnswers = new Set();
    allAnswers.add(correctAnswer);
    
    const subjectFlashcards = flashcardData[currentSubject]?.flashcards || [];
    const otherFlashcards = subjectFlashcards.filter(fc => fc.answer !== correctAnswer);
    
    while (allAnswers.size < 4 && otherFlashcards.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherFlashcards.length);
        const randomFlashcard = otherFlashcards[randomIndex];
        if (randomFlashcard.answer.length > 3 && randomFlashcard.answer !== correctAnswer) {
            allAnswers.add(randomFlashcard.answer);
        }
        otherFlashcards.splice(randomIndex, 1);
    }
    
    if (allAnswers.size < 4) {
        const plausibleDistractors = getPlausibleDistractors(currentSubject, currentFlashcard.question);
        plausibleDistractors.forEach(distractor => {
            if (!allAnswers.has(distractor) && allAnswers.size < 4) {
                allAnswers.add(distractor);
            }
        });
    }
    
    while (allAnswers.size < 4) {
        const randomSubject = Object.keys(flashcardData)[Math.floor(Math.random() * Object.keys(flashcardData).length)];
        const subjectCards = flashcardData[randomSubject].flashcards;
        const randomCard = subjectCards[Math.floor(Math.random() * subjectCards.length)];
        if (!allAnswers.has(randomCard.answer) && randomCard.answer.length > 3) {
            allAnswers.add(randomCard.answer);
        }
    }
    
    currentOptions = Array.from(allAnswers);
    shuffleArray(currentOptions);
    
    for (let i = 0; i < 4; i++) {
        document.getElementById(`option-text-${i}`).textContent = currentOptions[i];
    }
}

function getPlausibleDistractors(subject, question) {
    const distractors = {
        english: {
            'resolution': ['Climax', 'Rising action', 'Falling action'],
            'protagonist': ['Antagonist', 'Narrator', 'Minor character'],
            'simile': ['Metaphor', 'Personification', 'Alliteration'],
            'sonnet': ['Haiku', 'Ballad', 'Epic'],
            'iambic pentameter': ['Trochaic tetrameter', 'Anapestic hexameter', 'Dactylic trimeter'],
            'alliteration': ['Assonance', 'Consonance', 'Onomatopoeia'],
            'theme': ['Plot', 'Setting', 'Character'],
            'irony': ['Sarcasm', 'Satire', 'Hyperbole'],
            'foreshadowing': ['Flashback', 'Symbolism', 'Imagery'],
            'dialogue': ['Monologue', 'Soliloquy', 'Narration'],
            'wrote': ['Charles Dickens', 'Jane Austen', 'George Orwell', 'Harper Lee', 'Emily Brontë', 'T.S. Eliot', 'Samuel Beckett', 'George Bernard Shaw', 'E.M. Forster', 'Mary Shelley'],
            'author': ['Charles Dickens', 'Jane Austen', 'George Orwell', 'Harper Lee', 'Emily Brontë', 'T.S. Eliot', 'Samuel Beckett', 'George Bernard Shaw', 'E.M. Forster', 'Mary Shelley']
        },
        maths: {
            'derivative': ['Integral', 'Limit', 'Differential'],
            'Pythagorean': ['Trigonometric', 'Geometric', 'Algebraic'],
            'sin': ['Cos', 'Tan', 'Sec'],
            'log': ['Exp', 'Ln', 'Log'],
            'area': ['Perimeter', 'Volume', 'Circumference'],
            'gradient': ['Intercept', 'Slope', 'Curvature'],
            'probability': ['Statistics', 'Mean', 'Median'],
            'arithmetic': ['Geometric', 'Harmonic', 'Fibonacci'],
            'discriminant': ['Determinant', 'Coefficient', 'Constant'],
            'binomial': ['Polynomial', 'Monomial', 'Trinomial']
        },
        physics: {
            'Newton': ['Einstein', 'Galileo', 'Kepler'],
            'force': ['Energy', 'Power', 'Momentum'],
            'kinetic': ['Potential', 'Thermal', 'Electrical'],
            'Ohm': ['Watt', 'Volt', 'Ampere'],
            'momentum': ['Impulse', 'Velocity', 'Acceleration'],
            'gravity': ['Electromagnetism', 'Strong force', 'Weak force'],
            'work': ['Energy', 'Power', 'Heat'],
            'wave': ['Particle', 'Photon', 'Quantum'],
            'refraction': ['Reflection', 'Diffraction', 'Interference'],
            'Doppler': ['Resonance', 'Frequency', 'Amplitude']
        },
        chemistry: {
            'oxidation': ['Reduction', 'Neutralization', 'Combustion'],
            'covalent': ['Ionic', 'Metallic', 'Hydrogen'],
            'acid': ['Base', 'Salt', 'Neutral'],
            'Avogadro': ['Boltzmann', 'Faraday', 'Mole'],
            'pH': ['pOH', 'Molarity', 'Molality'],
            'endothermic': ['Exothermic', 'Isothermic', 'Adiabatic'],
            'catalyst': ['Inhibitor', 'Reactant', 'Product'],
            'isotope': ['Isomer', 'Allotrope', 'Compound'],
            'organic': ['Inorganic', 'Organometallic', 'Polymer'],
            'equilibrium': ['Kinetics', 'Thermodynamics', 'Electrochemistry']
        },
        biology: {
            'mitosis': ['Meiosis', 'Binary fission', 'Budding'],
            'photosynthesis': ['Respiration', 'Fermentation', 'Digestion'],
            'DNA': ['RNA', 'Protein', 'Carbohydrate'],
            'mitochondria': ['Chloroplast', 'Nucleus', 'Ribosome'],
            'osmosis': ['Diffusion', 'Active transport', 'Facilitated diffusion'],
            'homeostasis': ['Metabolism', 'Catabolism', 'Anabolism'],
            'natural selection': ['Artificial selection', 'Genetic drift', 'Gene flow'],
            'prokaryotic': ['Eukaryotic', 'Viruses', 'Bacteria'],
            'ATP': ['ADP', 'AMP', 'NADPH'],
            'ecosystem': ['Community', 'Population', 'Biosphere']
        },
        history: {
            'World War II': ['World War I', 'Cold War', 'Korean War'],
            'French Revolution': ['American Revolution', 'Russian Revolution', 'Industrial Revolution'],
            'Renaissance': ['Enlightenment', 'Dark Ages', 'Middle Ages'],
            'Magna Carta': ['Bill of Rights', 'Declaration of Independence', 'Constitution'],
            'Nazi': ['Fascist', 'Communist', 'Democratic'],
            'colonialism': ['Imperialism', 'Nationalism', 'Globalization'],
            'civil rights': ['Women\'s suffrage', 'Labor rights', 'Animal rights'],
            'industrialization': ['Urbanization', 'Modernization', 'Globalization'],
            'Cold War': ['Hot War', 'World War', 'Proxy War'],
            'decolonization': ['Independence', 'Revolution', 'Nationalism']
        },
        geography: {
            'Pacific': ['Atlantic', 'Indian', 'Arctic'],
            'erosion': ['Deposition', 'Weathering', 'Transport'],
            'greenhouse': ['Ozone', 'Pollution', 'Climate'],
            'tectonic': ['Volcanic', 'Earthquake', 'Erosion'],
            'urbanization': ['Industrialization', 'Migration', 'Globalization'],
            'population': ['Demography', 'Migration', 'Fertility'],
            'climate change': ['Global warming', 'Ozone depletion', 'Acid rain'],
            'renewable': ['Non-renewable', 'Fossil fuels', 'Nuclear'],
            'delta': ['Estuary', 'Fjord', 'Bay'],
            'monsoon': ['Tornado', 'Hurricane', 'Typhoon']
        },
        economics: {
            'supply': ['Demand', 'Price', 'Quantity'],
            'GDP': ['GNP', 'CPI', 'Inflation'],
            'inflation': ['Deflation', 'Stagflation', 'Hyperinflation'],
            'opportunity cost': ['Marginal cost', 'Total cost', 'Average cost'],
            'monopoly': ['Oligopoly', 'Perfect competition', 'Monopolistic competition'],
            'fiscal': ['Monetary', 'Supply-side', 'Demand-side'],
            'elasticity': ['Inelasticity', 'Cross-price', 'Income'],
            'trade': ['Protectionism', 'Tariffs', 'Quotas'],
            'unemployment': ['Employment', 'Underemployment', 'Discouraged workers'],
            'budget deficit': ['Budget surplus', 'National debt', 'Fiscal balance']
        }
    };
    
    const subjectDistractors = distractors[subject] || {};
    for (const [keyword, distractorList] of Object.entries(subjectDistractors)) {
        if (question.toLowerCase().includes(keyword.toLowerCase())) {
            return distractorList;
        }
    }
    
    return [];
}

function resetOptionButtons() {
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`option-${i}`);
        btn.classList.remove('correct', 'wrong', 'disabled', 'selected');
    }
}

function resetTimer() {
    timer = 15;
    document.getElementById('timer').textContent = timer;
    document.getElementById('timer').classList.remove('timer-warning');
    
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';
    timerBar.classList.remove('warning');
    
    removeScreenFlash();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        
        const percentage = (timer / 15) * 100;
        timerBar.style.width = `${percentage}%`;
        
        if (timer <= 5) {
            document.getElementById('timer').classList.add('timer-warning');
        }
        
        if (timer <= 5) {
            timerBar.classList.add('warning');
            showScreenFlash();
            playTimerWarning();
        }
        
        if (timer <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function showScreenFlash() {
    const gameSection = document.getElementById('game');
    if (!gameSection.classList.contains('active')) {
        return;
    }
    
    let flash = document.querySelector('.screen-flash');
    if (!flash) {
        flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
    } else {
        flash.style.animation = 'none';
        flash.offsetHeight;
        flash.style.animation = null;
    }
}

function removeScreenFlash() {
    const flash = document.querySelector('.screen-flash');
    if (flash) {
        flash.remove();
    }
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function selectAnswer(optionIndex) {
    clearInterval(timerInterval);
    
    const selectedAnswer = currentOptions[optionIndex];
    const currentFlashcard = currentFlashcards[currentIndex];
    const isCorrect = selectedAnswer === currentFlashcard.answer;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.classList.add('disabled'));
    
    const selectedBtn = document.getElementById(`option-${optionIndex}`);
    
    flipCard();
    
    setTimeout(() => {
        if (isCorrect) {
            lastAnswerCorrect = true;
            correctCount++;
            consecutiveCorrect++;
            
            const basePoints = Math.max(10, timer * 2);
            const multiplier = doublePointsActive ? 2 : 1;
            const earnedPoints = basePoints * multiplier;
            roundPoints += earnedPoints;
            document.getElementById('round-points').textContent = roundPoints;
            
            if (consecutiveCorrect >= 3) {
                totalPoints += 100;
                document.getElementById('total-points').textContent = totalPoints;
                consecutiveCorrect = 0;
                showBankNotification();
                playBankSound();
            }
            
            selectedBtn.classList.add('correct');
            playCorrectSound();
            playLoudCheer();
            createConfetti();
            
            if (currentGame && currentGame.status === 'playing') {
                liveScores[currentUser.name] = roundPoints;
                simulateOtherPlayersAnswering();
            }
        } else {
            lastAnswerCorrect = false;
            wrongCount++;
            consecutiveCorrect = 0;
            
            const alreadyExists = wrongFlashcards.some(fc => fc.question === currentFlashcard.question);
            if (!alreadyExists) {
                wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
            }
            
            selectedBtn.classList.add('wrong');
            
            const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
            if (correctIndex !== -1) {
                document.getElementById(`option-${correctIndex}`).classList.add('correct');
            }
            
            playWrongSound();
            
            if (currentGame && currentGame.status === 'playing') {
                liveScores[currentUser.name] = roundPoints;
                simulateOtherPlayersAnswering();
            }
        }
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }, 500);
}

function handleTimeout() {
    clearInterval(timerInterval);
    playTimerBuzzer();
    removeScreenFlash();
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => btn.classList.add('disabled'));
    
    flipCard();
    
    setTimeout(() => {
        lastAnswerCorrect = false;
        wrongCount++;
        consecutiveCorrect = 0;
        
        const currentFlashcard = currentFlashcards[currentIndex];
        const alreadyExists = wrongFlashcards.some(fc => fc.question === currentFlashcard.question);
        if (!alreadyExists) {
            wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
        }
        
        const correctIndex = currentOptions.indexOf(currentFlashcard.answer);
        if (correctIndex !== -1) {
            document.getElementById(`option-${correctIndex}`).classList.add('correct');
        }
        
        playWrongSound();
        
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }, 500);
}

function showBankNotification() {
    const notification = document.getElementById('bank-notification');
    notification.style.display = 'flex';
    notification.style.opacity = '1';
    playCheerSound();
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

function nextQuestion() {
    if (isRedemptionMode && lastAnswerCorrect) {
        const currentFlashcard = currentFlashcards[currentIndex];
        const index = wrongFlashcards.findIndex(fc => fc.question === currentFlashcard.question);
        if (index !== -1) {
            wrongFlashcards.splice(index, 1);
        }
    }
    
    currentIndex++;
    document.getElementById('current-question').textContent = currentIndex + 1;
    resetTimer();
    loadFlashcard();
}

function usePowerUp(powerUpId) {
    if (consecutiveCorrect < 5) {
        return;
    }
    
    switch(powerUpId) {
        case 1:
            if (!powerUp1RoundUsed) {
                timer += 5;
                document.getElementById('timer').textContent = timer;
                powerUp1RoundUsed = true;
                document.getElementById('power-up-1').disabled = true;
            }
            break;
        case 2:
            if (!powerUp2RoundUsed) {
                doublePointsActive = true;
                powerUp2RoundUsed = true;
                document.getElementById('power-up-2').disabled = true;
                setTimeout(() => {
                    doublePointsActive = false;
                }, 30000);
            }
            break;
        case 3:
            if (!powerUp3RoundUsed) {
                powerUp3RoundUsed = true;
                document.getElementById('power-up-3').disabled = true;
                
                lastAnswerCorrect = false;
                wrongCount++;
                consecutiveCorrect = 0;
                
                const currentFlashcard = currentFlashcards[currentIndex];
                const alreadyExists = wrongFlashcards.some(fc => fc.question === currentFlashcard.question);
                if (!alreadyExists) {
                    wrongFlashcards.push({ ...currentFlashcard, subject: currentSubject });
                }
                
                playWrongSound();
                nextQuestion();
            }
            break;
    }
}

function updatePowerUpButtons() {
    const canUsePowerUp = consecutiveCorrect >= 5;
    document.getElementById('power-up-1').disabled = powerUp1RoundUsed || !canUsePowerUp;
    document.getElementById('power-up-2').disabled = powerUp2RoundUsed || !canUsePowerUp;
    document.getElementById('power-up-3').disabled = powerUp3RoundUsed || !canUsePowerUp;
}

function endGame() {
    clearInterval(timerInterval);
    
    totalPoints += roundPoints;
    document.getElementById('total-points').textContent = totalPoints;
    
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
    
    const totalQuestions = correctCount + wrongCount;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('earned-points').textContent = roundPoints;
    
    updateLeaderboard(correctCount, wrongCount, accuracy, roundPoints);
    
    const redemptionBtn = document.getElementById('redemption-btn');
    const redemptionInfo = document.getElementById('redemption-info');
    
    if (wrongFlashcards.length > 0) {
        redemptionInfo.textContent = `${wrongFlashcards.length} questions need review`;
        redemptionBtn.style.display = 'inline-block';
    } else {
        redemptionInfo.textContent = '';
        redemptionBtn.style.display = 'none';
    }
    
    showSection('results');
}

function startRedemptionQuiz() {
    if (wrongFlashcards.length === 0) return;
    
    isRedemptionMode = true;
    currentFlashcards = [...wrongFlashcards];
    shuffleArray(currentFlashcards);
    currentIndex = 0;
    roundPoints = 0;
    correctCount = 0;
    wrongCount = 0;
    consecutiveCorrect = 0;
    doublePointsActive = false;
    powerUp1Used = false;
    powerUp2Used = false;
    powerUp3Used = false;
    
    document.getElementById('game-subject').textContent = `Redemption - ${flashcardData[currentSubject]?.name || 'Review'}`;
    document.getElementById('current-question').textContent = '1';
    document.getElementById('total-questions').textContent = currentFlashcards.length;
    document.getElementById('round-points').textContent = '0';
    
    resetTimer();
    loadFlashcard();
    showSection('game');
}

function playAgain() {
    selectSubject(currentSubject);
}

const leaderboard = [
    { name: 'Alex Johnson', points: 2500, subject: 'Mathematics' },
    { name: 'Sarah Williams', points: 2200, subject: 'Physics' },
    { name: 'Michael Chen', points: 1900, subject: 'Chemistry' },
    { name: 'Emma Davis', points: 1750, subject: 'Biology' },
    { name: 'James Wilson', points: 1600, subject: 'History' },
    { name: 'Olivia Brown', points: 1450, subject: 'Geography' },
    { name: 'William Taylor', points: 1300, subject: 'Economics' },
    { name: 'Sophia Martinez', points: 1150, subject: 'English' },
    { name: 'David Anderson', points: 1000, subject: 'Mathematics' },
    { name: 'Isabella Thomas', points: 850, subject: 'Physics' }
];

function updateLeaderboard(correct, wrong, accuracy, points) {
    const playerName = currentUser.name;
    const subject = flashcardData[currentSubject]?.name || 'Unknown';
    
    leaderboard.push({ name: playerName, points: points, subject: subject });
    leaderboard.sort((a, b) => b.points - a.points);
    
    if (leaderboard.length > 10) {
        leaderboard.pop();
    }
}

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('username-input').value = '';
}

function login() {
    const username = document.getElementById('username-input').value.trim();
    if (username.length > 0) {
        currentUser.name = username;
        currentUser.isLoggedIn = true;
        document.getElementById('user-name').textContent = username;
        document.getElementById('login-btn').style.display = 'none';
        closeLoginModal();
    }
}

function renderLeaderboard() {
    const rowsContainer = document.getElementById('leaderboard-rows');
    rowsContainer.innerHTML = '';
    
    leaderboard.forEach((player, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.innerHTML = `
            <span class="rank">#${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-points">${player.points}</span>
            <span class="player-subject">${player.subject}</span>
        `;
        rowsContainer.appendChild(row);
    });
}

function generateGameCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function createGame() {
    const gameCode = generateGameCode();
    currentGame = {
        code: gameCode,
        subject: 'maths',
        players: [],
        status: 'waiting'
    };
    
    isHost = true;
    gamePlayers = [{ name: currentUser.name, isHost: true, score: 0 }];
    liveScores[currentUser.name] = 0;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`open-claus://join?code=${gameCode}`)}`;
    document.getElementById('qr-image').src = qrUrl;
    document.getElementById('qr-image').style.display = 'block';
    document.getElementById('qr-icon').style.display = 'none';
    document.getElementById('qr-text').textContent = 'Scan to Join';
    document.getElementById('game-code').textContent = gameCode;
    document.getElementById('lobby-code-display').textContent = gameCode;
    
    document.querySelector('.multiplayer-container').style.display = 'none';
    document.getElementById('lobby-container').style.display = 'block';
    document.getElementById('start-game-btn').style.display = 'block';
    
    renderPlayers();
}

function joinGame() {
    const gameCode = document.getElementById('join-code-input').value.trim().toUpperCase();
    if (gameCode.length !== 6) {
        alert('Please enter a valid 6-character game code');
        return;
    }
    
    currentGame = {
        code: gameCode,
        subject: 'maths',
        players: [],
        status: 'waiting'
    };
    
    isHost = false;
    gamePlayers = [{ name: currentUser.name, isHost: false, score: 0 }];
    liveScores[currentUser.name] = 0;
    
    document.getElementById('lobby-code-display').textContent = gameCode;
    
    document.querySelector('.multiplayer-container').style.display = 'none';
    document.getElementById('lobby-container').style.display = 'block';
    document.getElementById('start-game-btn').style.display = 'none';
    
    simulateOtherPlayers();
    renderPlayers();
}

function simulateOtherPlayers() {
    const fakePlayers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const numPlayers = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numPlayers; i++) {
        const playerName = fakePlayers[i];
        gamePlayers.push({ name: playerName, isHost: false, score: 0 });
        liveScores[playerName] = 0;
    }
    
    renderPlayers();
}

function renderPlayers() {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    gamePlayers.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.className = `player-item ${player.isHost ? 'host' : ''} ${player.name === currentUser.name ? 'you' : ''}`;
        playerItem.innerHTML = `<span>${player.name}</span>`;
        playersList.appendChild(playerItem);
    });
}

function leaveGame() {
    currentGame = null;
    isHost = false;
    gamePlayers = [];
    liveScores = {};
    
    document.getElementById('qr-image').style.display = 'none';
    document.getElementById('qr-icon').style.display = 'block';
    document.getElementById('qr-text').textContent = 'Create a game to generate QR code';
    document.getElementById('game-code').textContent = '----';
    
    document.getElementById('lobby-container').style.display = 'none';
    document.getElementById('live-scores').style.display = 'none';
    document.querySelector('.multiplayer-container').style.display = 'grid';
    document.getElementById('join-code-input').value = '';
}

function startMultiplayerGame() {
    currentGame.status = 'playing';
    
    document.getElementById('lobby-container').style.display = 'none';
    document.getElementById('live-scores').style.display = 'block';
    
    selectSubject('maths');
}

function updateLiveScores() {
    const scoresContainer = document.getElementById('live-scores-container');
    scoresContainer.innerHTML = '';
    
    const sortedPlayers = Object.entries(liveScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    sortedPlayers.forEach(([name, points], index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = `live-score-item position-${index + 1} ${name === currentUser.name ? 'you' : ''}`;
        scoreItem.innerHTML = `
            <span class="live-score-name">${name}</span>
            <span class="live-score-points">${points}</span>
        `;
        scoresContainer.appendChild(scoreItem);
    });
}

function simulateOtherPlayersAnswering() {
    if (!currentGame || currentGame.status !== 'playing') return;
    
    gamePlayers.forEach(player => {
        if (player.name !== currentUser.name) {
            const isCorrect = Math.random() > 0.3;
            const points = isCorrect ? Math.floor(Math.random() * 20) + 10 : 0;
            liveScores[player.name] += points;
        }
    });
    
    updateLiveScores();
}

document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
});