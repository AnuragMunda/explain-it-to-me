'use client';

import { useEffect, useState } from "react"
import Markdown from "react-markdown";

interface Props {
    setIsData: (data: boolean) => void;
}

const ResultSection: React.FC<Props> = ({ setIsData }) => {
    const [explanation, setExplanation] = useState<string | null>(null);

    const result = `# Understanding Gravitational Force\n\nImagine you drop a ball. What happens? It falls to the ground, right? It doesn't float up to the ceiling or stay in the air. That's because of something called \"gravitational force\"! It's a bit like a hidden superhero power that pulls things down.\n\nLet's break down what gravitational force is all about.\n\n---\n\n### How Gravity Works: A Step-by-Step Guide\n\n**Step 1: The Invisible Pull**\nGravitational force is like an invisible rope that pulls things towards each other. It's not a real rope you can see or touch, but its pull is definitely real! This pull is what makes things fall down, keeps you on the Earth, and even holds the moon in its orbit around our planet.\n\n**Step 2: Everything Has a Pull**\nHere's a cool secret: *everything* that has \"stuff\" (which scientists call \"mass\") has this invisible pull! You have it, your friend has it, your dog has it, and even a tiny pebble has it. It's just that some things have a much, much stronger pull than others.\n\n**Step 3: Size Matters (The More Stuff, The Stronger the Pull!)**\nThink of it like this: If you have a giant magnet and a tiny magnet, which one can pick up more paperclips? The giant magnet, right? It's the same with gravity. The more \"stuff\" (mass) an object has, the stronger its gravitational pull.\n\n*   **Example:** The Earth is *huge* and has a *lot* of stuff in it. That's why its gravitational pull is super strong, strong enough to pull you down and keep you from floating off into space! A small pebble, on the other hand, has very little stuff, so its pull is super weak – too weak for you to even notice it.\n\n**Step 4: Distance Matters Too (The Closer, The Stronger the Pull!)**\nImagine two people trying to pull on a rope. If they are very close together, it's easy for them to pull each other. But if they are super far apart, the pull will be much weaker, or they might not be able to pull at all!\n\nIt's similar with gravity. The closer two objects are to each other, the stronger the invisible pull between them. The farther apart they are, the weaker the pull becomes.\n\n*   **Example:** When you drop a ball, it's very close to the Earth, so the Earth's gravity pulls it down quickly. If that same ball were way out in space, super far from Earth, Earth's gravity would barely pull on it at all.\n\n**Step 5: Why We Don't Float Away**\nBecause Earth has so much \"stuff\" (mass) and you are very close to it, Earth's gravitational pull is incredibly strong on you. It's constantly pulling you towards its center, which is why you stay firmly on the ground and don't float off like an astronaut in space!\n\n**Step 6: Gravity in Action Around Us**\n*   **Falling things:** Apples falling from trees, rain falling from clouds, you falling if you trip – all thanks to gravity.\n*   **Planets in orbit:** Gravity is also what keeps the Moon circling around Earth and all the planets in our solar system circling around the Sun. The Sun is *gigantic*, so its gravity is strong enough to hold all the planets in their paths!\n\n---\n\n### Summary\n\nGravitational force is an invisible pulling power that exists between *any two things* that have \"stuff\" (mass). The more \"stuff\" an object has, and the closer another object is to it, the stronger this invisible pull will be. It's what keeps us on Earth, makes things fall, and keeps planets in their orbits!\n\n---\n\n### Glossary\n\n*   **Gravitational Force:** The invisible pulling power that exists between any two objects that have \"stuff\" (mass).\n*   **Mass:** How much \"stuff\" or material an object is made of. A big rock has more mass than a tiny pebble.\n*   **Orbit:** The curved path that one object takes around another object in space, usually held there by gravity (like the Moon around the Earth).`

    useEffect(() => {
        setExplanation(result);
        setIsData(true);
    }, [explanation, result, setIsData])

    return (
        <section className="w-full flex justify-center mb-15">
            {explanation && explanation != "" && (
                <article className="prose-xl prose-invert w-full md:w-[80%] lg:w-[65%] px-5 py-8 bg-black/30 rounded-2xl border whitespace-pre-line">
                    <Markdown
                        components={{
                            h1: (props) => (
                                <h1 className="text-3xl font-bold mt-6 text-[#bba62c]" {...props} />
                            ),
                            h2: (props) => (
                                <h2 className="text-2xl font-semibold mt-4 text-[#bba62c]" {...props} />
                            ),
                            h3: (props) => (
                                <h3 className="text-xl font-semibold mt-2 text-[#bba62c]" {...props} />
                            ),
                            strong: (props) => (
                                <strong className="text-base font-bold text-[#e5dcab]" {...props} />
                            ),
                        }}
                    >
                        {explanation}
                    </Markdown>
                </article>
            )}
        </section>
    )
}

export default ResultSection