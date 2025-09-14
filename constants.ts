export interface GenreCategory {
  name: string;
  subgenres: string[];
}

export const GENRE_CATEGORIES: GenreCategory[] = [
  {
    name: 'Electronic',
    subgenres: [
      'Acid House', 'Afro House', 'Ambient', 'Ambient Techno', 'Atmospheric Drum and Bass', 'Bass House', 
      'Berghain Techno', 'Berlin School', 'Big Beat', 'Breakbeat', 'Breakcore', 'Chillwave', 'Chiptune', 
      'Complextro', 'Dark Ambient', 'Darkwave', 'Deconstructed Club', 'Deep House', 'Digital Hardcore', 
      'Downtempo', 'Drum and Bass', 'Dub Techno', 'Dubstep', 'EBM (Electronic Body Music)', 'Electro', 
      'Electro Swing', 'Eurodance', 'French House', 'Future Bass', 'Future Garage', 'Gabber', 'Garage', 
      'Ghetto House', 'Glitch', 'Glitch Hop', 'Happy Hardcore', 'Hard Trance', 'Hardcore', 'Hardstyle', 
      'House', 'IDM', 'Industrial', 'Industrial Techno', 'Jungle', 'Juke / Footwork', 'Leftfield Bass', 
      'Liquid Drum and Bass', 'Lofi House', 'Microhouse', 'Minimal Techno', 'Neurofunk', 'Progressive House', 
      'Psybient', 'Psytrance', 'Raggacore', 'Speedcore', 'Synthwave', 'Tech House', 'Techno', 'Trance', 
      'Trip Hop', 'Tropical House', 'UK Bass', 'UK Garage', 'Vaporwave', 'Wave', 'Witch House'
    ],
  },
  {
    name: 'Hip Hop / R&B',
    subgenres: [
      'Abstract Hip Hop', 'Alternative R&B', 'Boom Bap', 'Chopped and Screwed', 'Cloud Rap', 
      'Conscious Hip Hop', 'Crunk', 'Dirty South', 'Drill', 'Emo Rap', 'G-Funk', 'Grime', 
      'Hip Hop', 'Horrorcore', 'Hyphy', 'Industrial Hip Hop', 'Jazz Rap', 'Lofi Hip Hop', 
      'Memphis Rap', 'Neo Soul', 'Phonk', 'Political Hip Hop', 'R&B', 'SoundCloud Rap', 'Soul', 
      'Trap', 'Trap Metal', 'UK Drill', 'UK Hip Hop'
    ],
  },
  {
    name: 'Rock',
    subgenres: [
      'Afro-Punk', 'Alternative Rock', 'Art Punk', 'Art Rock', 'Blackgaze', 'Blues Rock', 'Britpop', 
      'Dance-Punk', 'Desert Rock', 'Dream Pop', 'Emo', 'Folk Punk', 'Funk Rock', 'Garage Rock', 
      'Glam Rock', 'Goth Rock', 'Grunge', 'Hard Rock', 'Indie Rock', 'Industrial Rock', 'Jangle Pop', 
      'Krautrock', 'Math Rock', 'Midwest Emo', 'No Wave', 'Noise Pop', 'Noise Rock', 'Post-Hardcore', 
      'Post-Punk', 'Post-Rock', 'Psychedelic Pop', 'Psychedelic Rock', 'Punk Rock', 'Riot Grrrl', 
      'Sadcore', 'Screamo', 'Shoegaze', 'Skate Punk', 'Slowcore', 'Sludge Rock', 'Space Rock', 
      'Stoner Rock', 'Surf Rock', 'Symphonic Rock', 'Twee Pop'
    ],
  },
  {
    name: 'Pop',
    subgenres: [
      'Afrobeats', 'Art Pop', 'Bedroom Pop', 'Bollywood', 'Bubblegum Bass', 'City Pop', 'Dance-Pop', 
      'Electropop', 'French Pop', 'Hyperpop', 'Indie Pop', 'J-Pop', 'K-Pop', 'Latin Pop', 'Pop', 
      'Power Pop', 'Shibuya-kei', 'Sophisti-Pop', 'Synth-Pop', 'Teen Pop'
    ],
  },
  {
    name: 'Metal',
    subgenres: [
      'Atmospheric Black Metal', 'Avant-Garde Metal', 'Black Metal', 'Death Metal', 'Deathcore', 'Djent', 
      'Doom Metal', 'Drone Metal', 'Epic Fantasy Metal', 'Folk Metal', 'Funeral Doom', 'Glam Metal', 
      'Gothic Metal', 'Grindcore', 'Groove Metal', 'Heavy Metal', 'Industrial', 'Mathcore', 
      'Melodic Death Metal', 'Metalcore', 'Nu Metal', 'Post-Metal', 'Power Metal', 'Progressive Metal', 
      'Rap Metal', 'Sludge Metal', 'Speed Metal', 'Symphonic Black Metal', 'Symphonic Metal', 
      'Technical Death Metal', 'Thrash Metal', 'Viking Metal'
    ],
  },
  {
    name: 'Jazz / Blues / Funk',
    subgenres: [
      'Acid Jazz', 'Avant-Garde Jazz', 'Bebop', 'Big Band', 'Blues', 'Bossa Nova', 'Chicago Blues', 
      'Cool Jazz', 'Dark Jazz', 'Delta Blues', 'Dixieland', 'Free Jazz', 'Funk', 'Gospel', 
      'Gypsy Jazz', 'Hard Bop', 'Jazz', 'Jazz Funk', 'Jazz Fusion', 'Latin Jazz', 'Nu Jazz', 
      'Smooth Jazz', 'Soul Jazz', 'Spiritual Jazz', 'Swing'
    ],
  },
  {
    name: 'Folk / Country',
    subgenres: [
      'Acid Folk', 'Alt-Country', 'Americana', 'Anti-Folk', 'Appalachian Folk', 'Bluegrass', 'Celtic', 
      'Chamber Folk', 'Country Blues', 'Country Pop', 'Cowpunk', 'Dark Folk', 'Folk', 'Freak Folk', 
      'Indie Folk', 'Neofolk', 'Neotraditional Country', 'Outlaw Country', 'Progressive Bluegrass', 
      'Progressive Folk', 'Psych Folk', 'Sea Shanty', 'Singer-Songwriter', 'Western Swing'
    ],
  },
  {
    name: 'World',
    subgenres: [
      'Afro-Cuban Jazz', 'Afrobeat', 'Bachata', 'Baile Funk', 'Bhangra', 'Calypso', 'Cumbia', 
      'Dancehall', 'Dub', 'Fado', 'Flamenco', 'Forró', 'Gnawa', 'Highlife', 'Jùjú', 'Kizomba', 
      'Kuduro', 'Makossa', 'Mbalax', 'Mento', 'Merengue', 'Polka', 'Qawwali', 'Rai', 'Reggae', 
      'Reggaeton', 'Salsa', 'Samba', 'Ska', 'Soca', 'Soukous', 'Tango', 'Traditional Irish Folk', 
      'Zeuhl', 'Zouk'
    ],
  },
  {
    name: 'Classical / Orchestral',
    subgenres: [
      'Avant-Garde Classical', 'Baroque', 'Chamber Music', 'Choral', 'Classical', 'Contemporary Classical', 
      'Early Music', 'Impressionist', 'Medieval', 'Minimalism', 'Modern Classical', 'Neoclassical', 
      'Opera', 'Orchestral', 'Renaissance', 'Romantic', 'Serialism'
    ],
  },
  {
    name: 'Other',
    subgenres: [
      'Black MIDI', 'Cinematic', 'Cyberpunk', 'Dungeon Synth', 'Ethereal Wave', 'Exotica', 
      'Field Recordings', 'Lowercase', 'Martial Industrial', 'New Age', 'Onkyo', 'Plunderphonics', 
      'Video Game Music'
    ],
  },
];

export const MOODS: string[] = [
  'Aggressive', 'Atmospheric', 'Brooding', 'Cinematic', 'Dark', 'Dreamy', 'Energetic',
  'Epic', 'Ethereal', 'Euphoric', 'Futuristic', 'Gritty', 'Hypnotic', 'Industrial',
  'Introspective', 'Lush', 'Melancholic', 'Minimalist', 'Mysterious', 'Nostalgic',
  'Psychedelic', 'Romantic', 'Spiritual', 'Uplifting', 'Vintage',
];

export const VOCAL_STYLES: string[] = [
  'Male Vocals', 'Female Vocals', 'Androgynous Vocals', 'Male Rapping', 'Female Rapping',
  'Operatic Vocals', 'Choir', 'Children\'s Choir', 'Spoken Word', 'Whispering',
  'Screaming Vocals', 'Vocal Chops', 'Harmonized Vocals', 'Robotic Vocals',
];

export const ATMOSPHERES: string[] = [
  'Rainy Day', 'City at Night', 'Vinyl Crackle', 'Forest Sounds', 'Ocean Waves',
  'Sci-Fi Ambiance', 'Distant Thunder', 'Tape Hiss', 'Crowded Room', 'Industrial Noise',
  'Windy Desert', 'Crackling Fireplace', 'Retro Arcade',
];

export const SONG_STRUCTURES = [
  { name: 'Standard', structure: '[Verse] [Chorus] [Verse] [Chorus] [Bridge] [Chorus] [Outro]' },
  { name: 'Simple', structure: '[Verse] [Chorus] [Verse] [Chorus] [Outro]' },
  { name: 'Verse-Heavy', structure: '[Intro] [Verse] [Verse] [Chorus] [Verse] [Outro]' },
  { name: 'Instrumental Focus', structure: '[Intro] [Verse] [Chorus] [Instrumental Solo] [Chorus] [Outro]' },
  { name: 'AABA', structure: '[Verse A] [Verse A] [Bridge B] [Verse A]' },
  { name: 'Custom', structure: ''}
];

export const INSTRUMENTS: string[] = [
  '808 Sub', 'Accordion', 'Acoustic Guitar', 'Alto Saxophone', 'Analog Synth', 'Bagpipes', 'Banjo',
  'Baritone Saxophone', 'Bass Clarinet', 'Bass Guitar', 'Bassoon', 'Bongos', 'Cello', 'Clarinet',
  'Clavinet', 'Congas', 'Contrabass', 'Cornet', 'Cymbal', 'Didgeridoo', 'Double Bass',
  'Drum Machine', 'Drums', 'Duduk', 'Electric Guitar', 'Electric Piano', 'English Horn',
  'Fiddle', 'Flugelhorn', 'Flute', 'French Horn', 'Glockenspiel', 'Gong', 'Grand Piano',
  'Hammond Organ', 'Handpan', 'Harmonica', 'Harp', 'Harpsichord', 'Hurdy-Gurdy', 'Kalimba',
  'Koto', 'Lute', 'Mandolin', 'Marimba', 'Mellotron', 'Moog Synth', 'Oboe', 'Ocarina', 'Organ',
  'Piano', 'Piccolo', 'Recorder', 'Rhodes Piano', 'Sampler', 'Sarangi', 'Saxophone', 'Shamisen',
  'Sitar', 'Steel Drums', 'String Section', 'Synthesizer', 'Tabla', 'Tambourine',
  'Tenor Saxophone', 'Theremin', 'Timpani', 'Triangle', 'Trombone', 'Trumpet', 'Tuba',
  'Ukulele', 'Vibraphone', 'Viola', 'Violin', 'Wurlitzer Piano', 'Xylophone', 'Zither'
];