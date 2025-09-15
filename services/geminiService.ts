
import { GoogleGenAI, Type, Part } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export interface AnalysisResult {
    subgenre: string;
    mood: string;
    bpm: number;
    key: string;
    instruments: string[];
}

export interface GeneratePromptOptions {
    promptMode: 'Instrumental' | 'Full Song';
    genre: string;
    mood: string | null;
    includeSolfeggio: boolean;
    influenceGenre?: string | null;
    instruments?: string[];
    vocalStyle?: string | null;
    atmosphere?: string | null;
    lyrics?: string;
    structure?: string;
    lyricalConcept?: string;
    bpm?: number | null;
    key?: string | null;
}

// Helper function to convert a File to a GoogleGenerativeAI.Part
const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

  return {
    inlineData: {
      data: base64,
      mimeType: file.type,
    },
  };
};

const generateInstrumentalPrompt = (options: GeneratePromptOptions): string => {
    const { genre, mood, includeSolfeggio, influenceGenre, instruments, bpm, key } = options;

    const solfeggioInstruction = includeSolfeggio 
    ? `The track's harmonic foundation must be built around a specific Solfeggio frequency. Choose one that aligns with the desired psychological effect (e.g., 528 Hz for transformation, 396 Hz for liberation). Describe its implementation, such as 'a sine wave at 528 Hz subtly layered beneath the bassline' or 'the root note of all pads tuned to 639 Hz'.` 
    : '';
    const moodInstruction = mood ? `The overarching mood is **${mood}**, driving every sonic choice.` : '';
    const influenceInstruction = influenceGenre ? `This is a fusion genre. While the primary genre is **${genre}**, it must be creatively blended with strong, unmistakable influences from **${influenceGenre}**.` : `The prompt must be for the genre: **${genre}**`;
    const instrumentInstruction = (instruments && instruments.length > 0) ? `The sonic palette must be built around these key instruments: **${instruments.join(', ')}**. They should be prominent and central to the arrangement.` : '';
    const foundationInstruction = (bpm && key) 
        ? `The musical foundation is precise: The BPM must be exactly **${bpm}** and the musical scale **${key}**.`
        : `Specify an exact **BPM** and a **Musical Scale** (e.g., C# Minor, A Lydian).`;

    return `
You are a Master Audio Engineer, a Master of Science in Psychology, and a world-class composer, renowned for creating intricate music scores that subtly influence the listener's state of mind. Your task is to architect a hyper-detailed instrumental prompt for an AI music generator, weaving together advanced audio engineering, musical theory, and psychoacoustic principles.

**Strict Constraints:**
1. The entire output must be a single, continuous paragraph.
2. The character limit is **1000 characters**. Be concise but dense with information.
3. **DO NOT** mention any artist names.
4. **DO NOT** include structural tags like [Intro] or [Verse].

**Core Components to Integrate:**
- **Genre & Influence:** ${influenceInstruction}
- **Key Instruments:** ${instrumentInstruction}
- **Musical Foundation:** ${foundationInstruction}
- **Rhythm, Cadence, Expression:** Describe the rhythmic character with precision. Detail the cadence, expression, and groove (e.g., "a hypnotic, polyrhythmic 12/8 groove with a slightly behind-the-beat snare").
- **Instrumentation & Timbre:** Name specific or high-end virtual/analog gear (e.g., "a warm Moog Matriarch bassline," "a crisp attack from a Dave Smith Prophet-5 pad").
- **Mixing & Mastering:** Specify modern techniques. Mention a target **LUFS** for mastering (e.g., -14 LUFS), **Dolby Atmos** spatial placement (e.g., "panning the arpeggio in a circular motion in the Atmos field"), and high-resolution audio quality.
- **Psychoacoustics (Hypnotic/Subliminal Layer):** Weave in a description of a subtle, almost imperceptible layer designed for positive psychological impact. For example: "buried deep in the mix is a binaural beat at 7Hz, designed to encourage a meditative state," or "a subliminal, reversed whisper track with positive affirmations barely audible beneath the reverb tail."
${moodInstruction}
${solfeggioInstruction}

Generate the prompt now. The output must be ONLY the prompt itself, without any introductory text, explanation, or markdown formatting.
`;
}

const generateFullSongPrompt = (options: GeneratePromptOptions): string => {
    const { genre, mood, includeSolfeggio, vocalStyle, atmosphere, lyrics, structure, influenceGenre, instruments, lyricalConcept, bpm, key } = options;
    
    const moodInstruction = mood ? `The mood is **${mood}**. Every element, from vocal cadence to reverb decay, must serve this mood.` : '';
    const atmosphereInstruction = atmosphere ? `Subtly weave in non-musical atmospheric sounds related to **${atmosphere}** to enhance the environment.` : '';
    const solfeggioInstruction = includeSolfeggio ? `The track's harmonic and psychoacoustic core is a Solfeggio frequency. Choose one that supports the song's theme and embed it within the mix (e.g., 'a 417 Hz sine wave for facilitating change, phase-aligned with the kick drum').` : '';
    const influenceInstruction = influenceGenre ? `This is a fusion genre. The primary genre is **${genre}**, but it must be creatively blended with strong influences from **${influenceGenre}**.` : `**Genre:** ${genre}`;
    const instrumentInstruction = (instruments && instruments.length > 0) ? `The arrangement must prominently feature: **${instruments.join(', ')}**.` : '';
    const foundationInstruction = (bpm && key)
        ? `The musical foundation is precise: The BPM must be exactly **${bpm}** and the musical scale **${key}**.`
        : `Specify an exact **BPM** and a **Musical Scale**.`;


    let lyricsInstruction;
    if (lyrics) {
        lyricsInstruction = `Use the following lyrics and intelligently distribute them across the song structure. The user may have included section hints like (Chorus) in the lyrics themselves:\n\n---\n${lyrics}\n---`;
    } else if (lyricalConcept) {
        lyricsInstruction = `Generate original, compelling lyrics based on the following concept: **"${lyricalConcept}"**. The lyrics must fit the song's mood, structure, and psychoacoustic goals.`;
    } else {
        lyricsInstruction = 'Generate appropriate lyrics for the song that align with the mood and psychoacoustic goals.';
    }

    return `
You are a Master Audio Engineer, a Master of Science in Psychology, and a world-class composer. Your expertise lies in fitting vocals perfectly within intricate instrumental arrangements across all genres, using psychoacoustic principles to create profound emotional impact. Your task is to create a complete, master-crafted SUNO prompt template.

**Strict Constraints:**
1. The total character limit is **1000 characters**. Be concise and impactful.
2. **DO NOT** reference any specific artist by name.
3. Use proper Suno formatting with structural tags like [Verse], [Chorus].

**User Specifications:**
- ${influenceInstruction}
- **Vocal Style:** ${vocalStyle}
- **Song Structure:** ${structure}
${instrumentInstruction}
${moodInstruction}
${atmosphereInstruction}

**Core Crafting Directives:**
- **Musical Foundation:** ${foundationInstruction}
- **Vocal Crafting:** For each vocal section, describe the required **cadence, rhythm, and expression** with precision (e.g., "a breathy, confidential cadence," "a rapid, syncopated rhythmic delivery").
- **Instrumentation & Timbre:** Be specific about gear (e.g., "a Neumann U87 vocal recording," "a cascading Arturia CS-80V synth line").
- **Mixing & Mastering:** Specify modern techniques. The mix must be crafted for **Dolby Atmos**, with vocals perfectly placed in the room. Target a mastering level of **-12 LUFS** for dynamic range.
- **Psychoacoustics (Subliminal Layer):** Weave in a description of a subtle layer for positive impact (e.g., "a subliminal 40Hz sine wave, resonating with the Solfeggio tone, to induce calm").
${solfeggioInstruction}
- **Lyrics:** ${lyricsInstruction}

**Task:**
Architect the complete, master-crafted song prompt now, integrating all directives within the specified structure. The output must be ONLY the prompt itself, without any extra explanations or markdown.
`;
}

export const generateSunoPrompt = async (options: GeneratePromptOptions): Promise<string> => {
    
    const metaPrompt = options.promptMode === 'Instrumental'
        ? generateInstrumentalPrompt(options)
        : generateFullSongPrompt(options);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt,
            config: {
                temperature: 0.95,
                topP: 1,
            }
        });

        const text = response.text.trim();
        if (!text) {
            throw new Error("Received an empty response from the AI.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export const enhanceSimplePrompt = async (simplePrompt: string): Promise<string> => {
    const metaPrompt = `
You are a Master Audio Engineer and world-class composer. A user has provided a very simple prompt idea. Your task is to "enhance" it, transforming it into a hyper-detailed, professional, instrumental prompt for an AI music generator.

**Strict Constraints:**
1. The entire output must be a single, continuous paragraph.
2. The character limit is **1000 characters**.
3. **DO NOT** mention any artist names.
4. **DO NOT** include structural tags like [Intro] or [Verse].

**Core Components to Integrate:**
- **Infer Genre & Mood:** Analyze the user's prompt to determine the most likely genre and mood.
- **Musical Foundation:** Specify an exact **BPM** and a **Musical Scale**.
- **Rhythm, Cadence, Expression:** Describe the rhythmic character with precision.
- **Instrumentation & Timbre:** Name specific or high-end virtual/analog gear.
- **Mixing & Mastering:** Specify modern techniques like **Dolby Atmos** placement and a target **LUFS**.
- **Psychoacoustics (Subliminal Layer):** Weave in a description of a subtle, almost imperceptible layer designed for positive psychological impact.

**User's Simple Prompt:** "${simplePrompt}"

Based on this, generate the enhanced prompt now. The output must be ONLY the prompt itself, without any introductory text, explanation, or markdown formatting.
`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt,
            config: {
                temperature: 0.8,
                topP: 1,
            }
        });
        const text = response.text.trim();
         if (!text) {
            throw new Error("Received an empty response from the AI.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API for enhancement:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export const getArtistInspirations = async (genre: string): Promise<string[]> => {
    const prompt = `Provide a JSON array of the top 5 most relevant and influential artists for the genre "${genre}". The JSON object should have a single key "artists" which is an array of strings.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        artists: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        const parsed = JSON.parse(jsonString);
        return parsed.artists || [];

    } catch (error) {
        console.error("Error fetching artist inspirations:", error);
        return [];
    }
};

export const analyzeTrack = async (source: string | File): Promise<AnalysisResult> => {
    const analysisPromptText = `You are an expert musicologist. Analyze the provided audio. Provide a detailed analysis in a specific JSON format. Identify the primary subgenre, the main mood, the exact BPM (as an integer), the musical key (e.g., "C# Minor"), and a list of the 3-5 most prominent instruments as an array of strings.`;

    let requestContents: (string | Part)[] | string;

    if (typeof source === 'string') {
        // Source is a URL
        requestContents = `${analysisPromptText} The audio is at the following URL: ${source}`;
    } else {
        // Source is a File
        const audioPart = await fileToGenerativePart(source);
        requestContents = [ { text: analysisPromptText }, audioPart ];
    }
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: requestContents,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        subgenre: { type: Type.STRING },
                        mood: { type: Type.STRING },
                        bpm: { type: Type.INTEGER },
                        key: { type: Type.STRING },
                        instruments: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["subgenre", "mood", "bpm", "key", "instruments"]
                }
            }
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error analyzing track:", error);
        throw new Error("Failed to analyze the track with the AI model.");
    }
};

export const generateVideoTreatment = async (songPrompt: string): Promise<string> => {
    const metaPrompt = `
You are a visionary music video director with a master's degree in cinematography and a deep understanding of music theory and emotional storytelling. You are tasked with creating a professional music video treatment based on a provided song prompt from an AI music generator.

**Strict Constraints:**
1.  Your output must be a well-structured document, formatted with clear headings for each scene (e.g., **SCENE 1: THE AWAKENING**).
2.  The treatment should outline a complete visual narrative that matches the song's emotional arc, lyrical themes, and musical dynamics.
3.  For each scene, you must describe:
    *   **Setting:** Where and when the scene takes place.
    *   **Visuals & Cinematography:** Key camera shots (e.g., "dramatic slow-motion dolly zoom," "intimate handheld close-up"), camera angles, and movements.
    *   **Lighting:** The lighting style (e.g., "stark chiaroscuro lighting," "soft, ethereal morning light," "pulsating neon strobes").
    *   **Color Palette:** The dominant colors of the scene (e.g., "a desaturated, melancholic blue and grey palette," "vibrant, oversaturated synthwave pinks and purples").
    *   **Pacing:** How the editing should feel (e.g., "rapid, rhythmic cuts synchronized with the drum beat," "long, meditative dissolves").

**The Song Prompt to Analyze:**
---
${songPrompt}
---

Based on the detailed information in this song prompt, generate the complete Music Video Treatment now. The output should be only the treatment itself, without any introductory text, explanation, or markdown formatting outside of the treatment structure.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: metaPrompt,
            config: {
                temperature: 0.8,
                topP: 1,
            }
        });
        const text = response.text.trim();
        if (!text) {
            throw new Error("Received an empty response from the AI for the video treatment.");
        }
        return text;
    } catch (error) {
        console.error("Error calling Gemini API for video treatment:", error);
        throw new Error("Failed to communicate with the AI model for video treatment.");
    }
};