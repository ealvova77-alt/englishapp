import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  Home,
  Search,
  Share2,
  Star,
  Trophy,
  Upload,
  Volume2,
  X,
} from "lucide-react";

const VERBS = [
  ["be", "was/were", "been", "biː", "wɒz/wɜːr", "biːn", "быть, являться, находиться", "basic"],
  ["become", "became", "become", "bɪˈkʌm", "bɪˈkeɪm", "bɪˈkʌm", "становиться, стать", "basic"],
  ["begin", "began", "begun", "bɪˈɡɪn", "bɪˈɡæn", "bɪˈɡʌn", "начинать, начинаться, приступать", "basic"],
  ["break", "broke", "broken", "breɪk", "brəʊk", "ˈbrəʊkən", "ломать, разбивать, нарушать", "basic"],
  ["bring", "brought", "brought", "brɪŋ", "brɔːt", "brɔːt", "приносить, привозить, доставлять", "basic"],
  ["build", "built", "built", "bɪld", "bɪlt", "bɪlt", "строить, создавать, возводить", "basic"],
  ["buy", "bought", "bought", "baɪ", "bɔːt", "bɔːt", "покупать, приобретать", "basic"],
  ["catch", "caught", "caught", "kætʃ", "kɔːt", "kɔːt", "ловить, поймать, успевать", "basic"],
  ["choose", "chose", "chosen", "tʃuːz", "tʃəʊz", "ˈtʃəʊzən", "выбирать, избирать", "basic"],
  ["come", "came", "come", "kʌm", "keɪm", "kʌm", "приходить, приезжать, наступать", "basic"],
  ["cost", "cost", "cost", "kɒst", "kɒst", "kɒst", "стоить, обходиться", "basic"],
  ["cut", "cut", "cut", "kʌt", "kʌt", "kʌt", "резать, стричь, сокращать", "basic"],
  ["do", "did", "done", "duː", "dɪd", "dʌn", "делать, выполнять, заниматься", "basic"],
  ["draw", "drew", "drawn", "drɔː", "druː", "drɔːn", "рисовать, чертить, тянуть, привлекать", "basic"],
  ["drink", "drank", "drunk", "drɪŋk", "dræŋk", "drʌŋk", "пить, выпивать", "basic"],
  ["drive", "drove", "driven", "draɪv", "drəʊv", "ˈdrɪvən", "водить, ехать, управлять, гнать", "basic"],
  ["eat", "ate", "eaten", "iːt", "eɪt", "ˈiːtən", "есть, кушать, питаться", "basic"],
  ["fall", "fell", "fallen", "fɔːl", "fel", "ˈfɔːlən", "падать, упасть, снижаться", "basic"],
  ["feel", "felt", "felt", "fiːl", "felt", "felt", "чувствовать, ощущать, трогать", "basic"],
  ["find", "found", "found", "faɪnd", "faʊnd", "faʊnd", "находить, обнаруживать, считать", "basic"],
  ["fly", "flew", "flown", "flaɪ", "fluː", "fləʊn", "летать, лететь, пролетать", "basic"],
  ["forget", "forgot", "forgotten", "fəˈɡet", "fəˈɡɒt", "fəˈɡɒtən", "забывать, запамятовать", "basic"],
  ["forgive", "forgave", "forgiven", "fəˈɡɪv", "fəˈɡeɪv", "fəˈɡɪvən", "прощать, извинять", "basic"],
  ["get", "got", "got/gotten", "ɡet", "ɡɒt", "ɡɒt/ˈɡɒtən", "получать, доставать, добираться, становиться", "basic"],
  ["give", "gave", "given", "ɡɪv", "ɡeɪv", "ˈɡɪvən", "давать, дарить, предоставлять", "basic"],
  ["go", "went", "gone", "ɡəʊ", "went", "ɡɒn", "идти, ходить, ехать, уходить", "basic"],
  ["grow", "grew", "grown", "ɡrəʊ", "ɡruː", "ɡrəʊn", "расти, выращивать, становиться", "basic"],
  ["have", "had", "had", "hæv", "hæd", "hæd", "иметь, обладать, получать", "basic"],
  ["hear", "heard", "heard", "hɪər", "hɜːd", "hɜːd", "слышать, слушать, узнавать", "basic"],
  ["hide", "hid", "hidden", "haɪd", "hɪd", "ˈhɪdən", "прятать, скрывать, прятаться", "basic"],
  ["hit", "hit", "hit", "hɪt", "hɪt", "hɪt", "ударять, попадать, поражать", "basic"],
  ["hold", "held", "held", "həʊld", "held", "held", "держать, удерживать, проводить", "basic"],
  ["hurt", "hurt", "hurt", "hɜːt", "hɜːt", "hɜːt", "причинять боль, ранить, болеть", "basic"],
  ["keep", "kept", "kept", "kiːp", "kept", "kept", "хранить, держать, продолжать, соблюдать", "basic"],
  ["know", "knew", "known", "nəʊ", "njuː", "nəʊn", "знать, уметь, быть знакомым", "basic"],
  ["learn", "learned/learnt", "learned/learnt", "lɜːn", "lɜːnd/lɜːnt", "lɜːnd/lɜːnt", "учить, учиться, узнавать, изучать", "basic"],
  ["leave", "left", "left", "liːv", "left", "left", "оставлять, уезжать, покидать, уходить", "basic"],
  ["lend", "lent", "lent", "lend", "lent", "lent", "одалживать, давать взаймы", "basic"],
  ["let", "let", "let", "let", "let", "let", "позволять, разрешать, допускать", "basic"],
  ["lose", "lost", "lost", "luːz", "lɒst", "lɒst", "терять, проигрывать, лишаться", "basic"],
  ["make", "made", "made", "meɪk", "meɪd", "meɪd", "делать, создавать, заставлять, изготавливать", "basic"],
  ["mean", "meant", "meant", "miːn", "ment", "ment", "значить, означать, иметь в виду, намереваться", "basic"],
  ["meet", "met", "met", "miːt", "met", "met", "встречать, знакомиться, встречаться", "basic"],
  ["pay", "paid", "paid", "peɪ", "peɪd", "peɪd", "платить, оплачивать, расплачиваться", "basic"],
  ["put", "put", "put", "pʊt", "pʊt", "pʊt", "класть, ставить, помещать", "basic"],
  ["read", "read", "read", "riːd", "red", "red", "читать, прочитать, считывать", "basic"],
  ["ride", "rode", "ridden", "raɪd", "rəʊd", "ˈrɪdən", "ехать верхом, кататься, ездить", "basic"],
  ["ring", "rang", "rung", "rɪŋ", "ræŋ", "rʌŋ", "звонить, звенеть, раздаваться", "basic"],
  ["run", "ran", "run", "rʌn", "ræn", "rʌn", "бежать, бегать, управлять, работать", "basic"],
  ["say", "said", "said", "seɪ", "sed", "sed", "сказать, говорить, произносить", "basic"],
  ["see", "saw", "seen", "siː", "sɔː", "siːn", "видеть, смотреть, понимать, навещать", "basic"],
  ["sell", "sold", "sold", "sel", "səʊld", "səʊld", "продавать, торговать", "basic"],
  ["send", "sent", "sent", "send", "sent", "sent", "посылать, отправлять, передавать", "basic"],
  ["set", "set", "set", "set", "set", "set", "устанавливать, ставить, задавать, настраивать", "basic"],
  ["show", "showed", "shown", "ʃəʊ", "ʃəʊd", "ʃəʊn", "показывать, демонстрировать, проявлять", "basic"],
  ["shut", "shut", "shut", "ʃʌt", "ʃʌt", "ʃʌt", "закрывать, захлопывать", "basic"],
  ["sing", "sang", "sung", "sɪŋ", "sæŋ", "sʌŋ", "петь, напевать", "basic"],
  ["sit", "sat", "sat", "sɪt", "sæt", "sæt", "сидеть, садиться, усаживаться", "basic"],
  ["sleep", "slept", "slept", "sliːp", "slept", "slept", "спать, засыпать, ночевать", "basic"],
  ["speak", "spoke", "spoken", "spiːk", "spəʊk", "ˈspəʊkən", "говорить, разговаривать, выступать", "basic"],
  ["spend", "spent", "spent", "spend", "spent", "spent", "тратить, проводить (время), расходовать", "basic"],
  ["stand", "stood", "stood", "stænd", "stʊd", "stʊd", "стоять, вставать, выдерживать", "basic"],
  ["swim", "swam", "swum", "swɪm", "swæm", "swʌm", "плавать, плыть, купаться", "basic"],
  ["take", "took", "taken", "teɪk", "tʊk", "ˈteɪkən", "брать, взять, принимать, занимать", "basic"],
  ["teach", "taught", "taught", "tiːtʃ", "tɔːt", "tɔːt", "учить, преподавать, обучать", "basic"],
  ["tell", "told", "told", "tel", "təʊld", "təʊld", "рассказывать, говорить, сообщать", "basic"],
  ["think", "thought", "thought", "θɪŋk", "θɔːt", "θɔːt", "думать, считать, полагать, размышлять", "basic"],
  ["throw", "threw", "thrown", "θrəʊ", "θruː", "θrəʊn", "бросать, кидать, швырять", "basic"],
  ["understand", "understood", "understood", "ˌʌndəˈstænd", "ˌʌndəˈstʊd", "ˌʌndəˈstʊd", "понимать, осознавать, разбираться", "basic"],
  ["wake", "woke/waked", "woken/waked", "weɪk", "wəʊk", "ˈwəʊkən", "просыпаться, будить, пробуждать", "basic"],
  ["wear", "wore", "worn", "weər", "wɔːr", "wɔːn", "носить, надевать, изнашивать", "basic"],
  ["win", "won", "won", "wɪn", "wʌn", "wʌn", "побеждать, выигрывать, завоёвывать", "basic"],
  ["write", "wrote", "written", "raɪt", "rəʊt", "ˈrɪtən", "писать, написать, записывать", "basic"],
  ["bite", "bit", "bitten", "baɪt", "bɪt", "ˈbɪtən", "кусать, кусаться, жалить", "basic"],
  ["burn", "burned/burnt", "burned/burnt", "bɜːn", "bɜːnd/bɜːnt", "bɜːnd/bɜːnt", "гореть, жечь, сжигать, обжигать", "basic"],
  ["fight", "fought", "fought", "faɪt", "fɔːt", "fɔːt", "сражаться, бороться, драться, воевать", "basic"],
  ["lead", "led", "led", "liːd", "led", "led", "вести, руководить, возглавлять", "basic"],
  ["lie", "lay", "lain", "laɪ", "leɪ", "leɪn", "лежать, располагаться", "basic"],
  ["rise", "rose", "risen", "raɪz", "rəʊz", "ˈrɪzən", "подниматься, вставать, возрастать, восходить", "basic"],
  ["shake", "shook", "shaken", "ʃeɪk", "ʃʊk", "ˈʃeɪkən", "трясти, дрожать, пожимать (руку)", "basic"],
  ["shoot", "shot", "shot", "ʃuːt", "ʃɒt", "ʃɒt", "стрелять, снимать (фото/видео), бросать", "basic"],
  ["steal", "stole", "stolen", "stiːl", "stəʊl", "ˈstəʊlən", "красть, воровать, похищать", "basic"],
  ["tear", "tore", "torn", "teər", "tɔːr", "tɔːn", "рвать, разрывать, срывать", "basic"],
  ["arise", "arose", "arisen", "əˈraɪz", "əˈrəʊz", "əˈrɪzən", "возникать, появляться, вставать", "advanced"],
  ["awake", "awoke/awaked", "awoken/awaked", "əˈweɪk", "əˈwəʊk", "əˈwəʊkən", "просыпаться, пробуждаться", "advanced"],
  ["bear", "bore", "borne/born", "beər", "bɔːr", "bɔːn", "нести, выносить, рождать, терпеть", "advanced"],
  ["bend", "bent", "bent", "bend", "bent", "bent", "сгибать, гнуть, наклоняться", "advanced"],
  ["bet", "bet", "bet", "bet", "bet", "bet", "ставить, держать пари, биться об заклад", "advanced"],
  ["bind", "bound", "bound", "baɪnd", "baʊnd", "baʊnd", "связывать, привязывать, обязывать", "advanced"],
  ["bleed", "bled", "bled", "bliːd", "bled", "bled", "кровоточить, истекать кровью", "advanced"],
  ["blow", "blew", "blown", "bləʊ", "bluː", "bləʊn", "дуть, дышать, взрывать", "advanced"],
  ["breed", "bred", "bred", "briːd", "bred", "bred", "разводить, выращивать, размножаться", "advanced"],
  ["broadcast", "broadcast", "broadcast", "ˈbrɔːdkɑːst", "ˈbrɔːdkɑːst", "ˈbrɔːdkɑːst", "транслировать, передавать, вещать", "advanced"],
  ["burst", "burst", "burst", "bɜːst", "bɜːst", "bɜːst", "лопаться, взрываться, разрываться", "advanced"],
  ["cast", "cast", "cast", "kɑːst", "kɑːst", "kɑːst", "бросать, отливать, забрасывать", "advanced"],
  ["cling", "clung", "clung", "klɪŋ", "klʌŋ", "klʌŋ", "цепляться, держаться, прилипать", "advanced"],
  ["creep", "crept", "crept", "kriːp", "krept", "krept", "ползти, красться, подкрадываться", "advanced"],
  ["deal", "dealt", "dealt", "diːl", "delt", "delt", "иметь дело, торговать, раздавать", "advanced"],
  ["dig", "dug", "dug", "dɪɡ", "dʌɡ", "dʌɡ", "копать, рыть, раскапывать", "advanced"],
  ["dream", "dreamed/dreamt", "dreamed/dreamt", "driːm", "driːmd/dremt", "driːmd/dremt", "мечтать, видеть сны, грезить", "advanced"],
  ["feed", "fed", "fed", "fiːd", "fed", "fed", "кормить, питать, подавать", "advanced"],
  ["flee", "fled", "fled", "fliː", "fled", "fled", "спасаться бегством, убегать, бежать", "advanced"],
  ["fling", "flung", "flung", "flɪŋ", "flʌŋ", "flʌŋ", "швырять, бросать, кидать", "advanced"],
  ["forbid", "forbade/forbad", "forbidden", "fəˈbɪd", "fəˈbæd", "fəˈbɪdən", "запрещать, не позволять", "advanced"],
  ["forecast", "forecast", "forecast", "ˈfɔːkɑːst", "ˈfɔːkɑːst", "ˈfɔːkɑːst", "прогнозировать, предсказывать", "advanced"],
  ["freeze", "froze", "frozen", "friːz", "frəʊz", "ˈfrəʊzən", "замерзать, замораживать, застывать", "advanced"],
  ["grind", "ground", "ground", "ɡraɪnd", "ɡraʊnd", "ɡraʊnd", "молоть, точить, шлифовать", "advanced"],
  ["hang", "hung", "hung", "hæŋ", "hʌŋ", "hʌŋ", "вешать, висеть, подвешивать", "advanced"],
  ["kneel", "knelt/kneeled", "knelt/kneeled", "niːl", "nelt", "nelt", "стоять на коленях, становиться на колени", "advanced"],
  ["knit", "knit/knitted", "knit/knitted", "nɪt", "nɪt/ˈnɪtɪd", "nɪt/ˈnɪtɪd", "вязать, сращивать", "advanced"],
  ["lay", "laid", "laid", "leɪ", "leɪd", "leɪd", "класть, положить, укладывать", "advanced"],
  ["lean", "leaned/leant", "leaned/leant", "liːn", "liːnd/lent", "liːnd/lent", "наклоняться, опираться, прислоняться", "advanced"],
  ["leap", "leaped/leapt", "leaped/leapt", "liːp", "liːpt/lept", "liːpt/lept", "прыгать, перепрыгивать, скакать", "advanced"],
  ["light", "lit/lighted", "lit/lighted", "laɪt", "lɪt", "lɪt", "зажигать, освещать, загораться", "advanced"],
  ["mistake", "mistook", "mistaken", "mɪˈsteɪk", "mɪˈstʊk", "mɪˈsteɪkən", "ошибаться, путать, принимать за другое", "advanced"],
  ["mow", "mowed", "mowed/mown", "məʊ", "məʊd", "məʊd/məʊn", "косить, стричь (газон)", "advanced"],
  ["overcome", "overcame", "overcome", "ˌəʊvəˈkʌm", "ˌəʊvəˈkeɪm", "ˌəʊvəˈkʌm", "преодолевать, побороть, справиться", "advanced"],
  ["overtake", "overtook", "overtaken", "ˌəʊvəˈteɪk", "ˌəʊvəˈtʊk", "ˌəʊvəˈteɪkən", "обгонять, догонять, настигать", "advanced"],
  ["prove", "proved", "proved/proven", "pruːv", "pruːvd", "pruːvd/ˈpruːvən", "доказывать, подтверждать, оказываться", "advanced"],
  ["quit", "quit/quitted", "quit/quitted", "kwɪt", "kwɪt", "kwɪt", "бросать, прекращать, увольняться", "advanced"],
  ["rid", "rid", "rid", "rɪd", "rɪd", "rɪd", "избавлять, освобождать", "advanced"],
  ["saw", "sawed", "sawed/sawn", "sɔː", "sɔːd", "sɔːd/sɔːn", "пилить, распиливать", "advanced"],
  ["seek", "sought", "sought", "siːk", "sɔːt", "sɔːt", "искать, стремиться, добиваться", "advanced"],
  ["sew", "sewed", "sewn/sewed", "səʊ", "səʊd", "səʊn/səʊd", "шить, пришивать, зашивать", "advanced"],
  ["shine", "shone/shined", "shone/shined", "ʃaɪn", "ʃɒn", "ʃɒn", "сиять, светить, блестеть", "advanced"],
  ["shrink", "shrank/shrunk", "shrunk", "ʃrɪŋk", "ʃræŋk", "ʃrʌŋk", "сжиматься, садиться, уменьшаться", "advanced"],
  ["sink", "sank/sunk", "sunk", "sɪŋk", "sæŋk", "sʌŋk", "тонуть, погружаться, опускаться", "advanced"],
  ["slide", "slid", "slid", "slaɪd", "slɪd", "slɪd", "скользить, сдвигать, соскальзывать", "advanced"],
  ["slit", "slit", "slit", "slɪt", "slɪt", "slɪt", "разрезать вдоль, прорезать", "advanced"],
  ["smell", "smelled/smelt", "smelled/smelt", "smel", "smeld/smelt", "smeld/smelt", "пахнуть, нюхать, чуять", "advanced"],
  ["sneak", "sneaked/snuck", "sneaked/snuck", "sniːk", "sniːkt/snʌk", "sniːkt/snʌk", "красться, пробираться, прокрадываться", "advanced"],
  ["sow", "sowed", "sowed/sown", "səʊ", "səʊd", "səʊd/səʊn", "сеять, засевать, сажать", "advanced"],
  ["speed", "sped/speeded", "sped/speeded", "spiːd", "sped", "sped", "мчаться, ускорять, нестись", "advanced"],
  ["spell", "spelt/spelled", "spelt/spelled", "spel", "spelt", "spelt", "произносить по буквам, писать по буквам", "advanced"],
  ["spill", "spilt/spilled", "spilt/spilled", "spɪl", "spɪlt", "spɪlt", "проливать, рассыпать, разливать", "advanced"],
  ["spin", "spun", "spun", "spɪn", "spʌn", "spʌn", "вращать, прясть, кружиться", "advanced"],
  ["spit", "spat/spit", "spat/spit", "spɪt", "spæt", "spæt", "плевать, выплёвывать", "advanced"],
  ["split", "split", "split", "splɪt", "splɪt", "splɪt", "разделять, раскалывать, расщеплять", "advanced"],
  ["spoil", "spoiled/spoilt", "spoiled/spoilt", "spɔɪl", "spɔɪld/spɔɪlt", "spɔɪld/spɔɪlt", "портить, баловать, испортить", "advanced"],
  ["spread", "spread", "spread", "spred", "spred", "spred", "распространять, расстилать, намазывать", "advanced"],
  ["spring", "sprang/sprung", "sprung", "sprɪŋ", "spræŋ", "sprʌŋ", "прыгать, возникать, появляться", "advanced"],
  ["squeeze", "squeezed", "squeezed", "skwiːz", "skwiːzd", "skwiːzd", "сжимать, выжимать, протискиваться", "advanced"],
  ["stick", "stuck", "stuck", "stɪk", "stʌk", "stʌk", "приклеивать, втыкать, застревать", "advanced"],
  ["sting", "stung", "stung", "stɪŋ", "stʌŋ", "stʌŋ", "жалить, кусать, обжигать", "advanced"],
  ["stink", "stank/stunk", "stunk", "stɪŋk", "stæŋk", "stʌŋk", "вонять, дурно пахнуть", "advanced"],
  ["stride", "strode", "stridden", "straɪd", "strəʊd", "ˈstrɪdən", "шагать широко, идти большими шагами", "advanced"],
  ["strike", "struck", "struck/stricken", "straɪk", "strʌk", "strʌk/ˈstrɪkən", "ударять, бастовать, поражать", "advanced"],
  ["string", "strung", "strung", "strɪŋ", "strʌŋ", "strʌŋ", "нанизывать, натягивать", "advanced"],
  ["strive", "strove/strived", "striven/strived", "straɪv", "strəʊv", "ˈstrɪvən", "стремиться, стараться, бороться", "advanced"],
  ["swear", "swore", "sworn", "sweər", "swɔːr", "swɔːn", "клясться, ругаться, присягать", "advanced"],
  ["sweep", "swept", "swept", "swiːp", "swept", "swept", "мести, подметать, сметать", "advanced"],
  ["swell", "swelled", "swollen/swelled", "swel", "sweld", "ˈswəʊlən", "набухать, раздуваться, опухать", "advanced"],
  ["swing", "swung", "swung", "swɪŋ", "swʌŋ", "swʌŋ", "качаться, размахивать, раскачиваться", "advanced"],
  ["thrust", "thrust", "thrust", "θrʌst", "θrʌst", "θrʌst", "толкать, совать, пихать", "advanced"],
  ["tread", "trod", "trodden/trod", "tred", "trɒd", "ˈtrɒdən", "ступать, топтать, наступать", "advanced"],
  ["weave", "wove/weaved", "woven/weaved", "wiːv", "wəʊv", "ˈwəʊvən", "ткать, плести, переплетать", "advanced"],
  ["weep", "wept", "wept", "wiːp", "wept", "wept", "плакать, рыдать, оплакивать", "advanced"],
  ["wind", "wound", "wound", "waɪnd", "waʊnd", "waʊnd", "заводить, наматывать, виться", "advanced"],
  ["withdraw", "withdrew", "withdrawn", "wɪðˈdrɔː", "wɪðˈdruː", "wɪðˈdrɔːn", "отзывать, снимать (деньги), отступать", "advanced"],
  ["wring", "wrung", "wrung", "rɪŋ", "rʌŋ", "rʌŋ", "выжимать, скручивать, заламывать", "advanced"],
  ["abide", "abode/abided", "abode/abided", "əˈbaɪd", "əˈbəʊd", "əˈbəʊd", "пребывать, придерживаться, терпеть", "rare"],
  ["alight", "alit/alighted", "alit/alighted", "əˈlaɪt", "əˈlɪt", "əˈlɪt", "сходить, спускаться, приземляться", "rare"],
  ["backslide", "backslid", "backslid/backslidden", "ˈbækˌslaɪd", "ˌbækˈslɪd", "ˌbækˈslɪd", "отступать, возвращаться к плохому", "rare"],
  ["befall", "befell", "befallen", "bɪˈfɔːl", "bɪˈfel", "bɪˈfɔːlən", "случаться, приключаться", "rare"],
  ["beget", "begot/begat", "begotten", "bɪˈɡet", "bɪˈɡɒt", "bɪˈɡɒtən", "порождать", "rare"],
  ["behold", "beheld", "beheld", "bɪˈhəʊld", "bɪˈheld", "bɪˈheld", "созерцать", "rare"],
  ["bereave", "bereaved/bereft", "bereaved/bereft", "bɪˈriːv", "bɪˈriːvd/bɪˈreft", "bɪˈriːvd/bɪˈreft", "лишать, отнимать", "rare"],
  ["beset", "beset", "beset", "bɪˈset", "bɪˈset", "bɪˈset", "осаждать, одолевать", "rare"],
  ["beseech", "besought/beseeched", "besought/beseeched", "bɪˈsiːtʃ", "bɪˈsɔːt", "bɪˈsɔːt", "умолять", "rare"],
  ["bestride", "bestrode", "bestridden", "bɪˈstraɪd", "bɪˈstrəʊd", "bɪˈstrɪdən", "садиться верхом", "rare"],
  ["bid", "bid/bade", "bid/bidden", "bɪd", "bɪd/beɪd", "bɪd/ˈbɪdən", "предлагать цену, велеть", "rare"],
  ["browbeat", "browbeat", "browbeaten", "ˈbraʊbiːt", "ˈbraʊbiːt", "ˈbraʊbiːtən", "запугивать", "rare"],
  ["bust", "busted/bust", "busted/bust", "bʌst", "ˈbʌstɪd/bʌst", "ˈbʌstɪd/bʌst", "разбивать, ломать", "rare"],
  ["chide", "chided/chid", "chided/chidden", "tʃaɪd", "ˈtʃaɪdɪd/tʃɪd", "ˈtʃaɪdɪd/ˈtʃɪdən", "ругать, бранить", "rare"],
  ["cleave", "cleft/clove", "cleft/cloven", "kliːv", "kleft/kləʊv", "kleft/ˈkləʊvən", "раскалывать", "rare"],
  ["countersink", "countersank", "countersunk", "ˈkaʊntəsɪŋk", "ˈkaʊntəsæŋk", "ˈkaʊntəsʌŋk", "зенковать", "rare"],
  ["crossbreed", "crossbred", "crossbred", "ˈkrɒsbriːd", "ˈkrɒsbred", "ˈkrɒsbred", "скрещивать", "rare"],
  ["dare", "dared/durst", "dared", "deər", "deəd/dɜːst", "deəd", "сметь, осмеливаться", "rare"],
  ["disprove", "disproved", "disproved/disproven", "ˌdɪsˈpruːv", "ˌdɪsˈpruːvd", "ˌdɪsˈpruːvd", "опровергать", "rare"],
  ["dive", "dived/dove", "dived", "daɪv", "daɪvd/dəʊv", "daɪvd", "нырять", "rare"],
  ["forebear", "forebore", "foreborne", "fɔːˈbeər", "fɔːˈbɔːr", "fɔːˈbɔːn", "воздерживаться", "rare"],
  ["foresee", "foresaw", "foreseen", "fɔːˈsiː", "fɔːˈsɔː", "fɔːˈsiːn", "предвидеть", "rare"],
  ["foretell", "foretold", "foretold", "fɔːˈtel", "fɔːˈtəʊld", "fɔːˈtəʊld", "предсказывать", "rare"],
  ["forgo", "forwent", "forgone", "fɔːˈɡəʊ", "fɔːˈwent", "fɔːˈɡɒn", "отказываться, воздерживаться", "rare"],
  ["forsake", "forsook", "forsaken", "fəˈseɪk", "fəˈsʊk", "fəˈseɪkən", "покидать, оставлять", "rare"],
  ["gainsay", "gainsaid", "gainsaid", "ˌɡeɪnˈseɪ", "ˌɡeɪnˈsed", "ˌɡeɪnˈsed", "отрицать, противоречить", "rare"],
  ["gild", "gilded/gilt", "gilded/gilt", "ɡɪld", "ˈɡɪldɪd/ɡɪlt", "ˈɡɪldɪd/ɡɪlt", "золотить", "rare"],
  ["hamstring", "hamstrung", "hamstrung", "ˈhæmstrɪŋ", "ˈhæmstrʌŋ", "ˈhæmstrʌŋ", "подрезать поджилки", "rare"],
  ["hew", "hewed", "hewn/hewed", "hjuː", "hjuːd", "hjuːn/hjuːd", "рубить, тесать", "rare"],
  ["inlay", "inlaid", "inlaid", "ˈɪnleɪ", "ˌɪnˈleɪd", "ˌɪnˈleɪd", "инкрустировать", "rare"],
  ["input", "input/inputted", "input/inputted", "ˈɪnpʊt", "ˈɪnpʊt", "ˈɪnpʊt", "вводить (данные)", "rare"],
  ["interbreed", "interbred", "interbred", "ˌɪntəˈbriːd", "ˌɪntəˈbred", "ˌɪntəˈbred", "скрещивать(ся)", "rare"],
  ["interweave", "interwove", "interwoven", "ˌɪntəˈwiːv", "ˌɪntəˈwəʊv", "ˌɪntəˈwəʊvən", "переплетать", "rare"],
  ["miscast", "miscast", "miscast", "ˌmɪsˈkɑːst", "ˌmɪsˈkɑːst", "ˌmɪsˈkɑːst", "неправильно распределять роли", "rare"],
  ["misdeal", "misdealt", "misdealt", "ˌmɪsˈdiːl", "ˌmɪsˈdelt", "ˌmɪsˈdelt", "неправильно сдавать (карты)", "rare"],
  ["misgive", "misgave", "misgiven", "ˌmɪsˈɡɪv", "ˌmɪsˈɡeɪv", "ˌmɪsˈɡɪvən", "внушать опасения", "rare"],
  ["mishear", "misheard", "misheard", "ˌmɪsˈhɪər", "ˌmɪsˈhɜːd", "ˌmɪsˈhɜːd", "ослышаться", "rare"],
  ["mislay", "mislaid", "mislaid", "ˌmɪsˈleɪ", "ˌmɪsˈleɪd", "ˌmɪsˈleɪd", "класть не на место", "rare"],
  ["mislead", "misled", "misled", "ˌmɪsˈliːd", "ˌmɪsˈled", "ˌmɪsˈled", "вводить в заблуждение", "rare"],
  ["misread", "misread", "misread", "ˌmɪsˈriːd", "ˌmɪsˈred", "ˌmɪsˈred", "неправильно читать/понимать", "rare"],
  ["misspell", "misspelled/misspelt", "misspelled/misspelt", "ˌmɪsˈspel", "ˌmɪsˈspeld/ˌmɪsˈspelt", "ˌmɪsˈspeld/ˌmɪsˈspelt", "неправильно писать", "rare"],
  ["misspend", "misspent", "misspent", "ˌmɪsˈspend", "ˌmɪsˈspent", "ˌmɪsˈspent", "растрачивать", "rare"],
  ["misunderstand", "misunderstood", "misunderstood", "ˌmɪsʌndəˈstænd", "ˌmɪsʌndəˈstʊd", "ˌmɪsʌndəˈstʊd", "неправильно понимать", "rare"],
  ["offset", "offset", "offset", "ˈɒfset", "ˈɒfset", "ˈɒfset", "возмещать, компенсировать", "rare"],
  ["outbid", "outbid", "outbid", "ˌaʊtˈbɪd", "ˌaʊtˈbɪd", "ˌaʊtˈbɪd", "перебивать ставку", "rare"],
  ["outdo", "outdid", "outdone", "ˌaʊtˈduː", "ˌaʊtˈdɪd", "ˌaʊtˈdʌn", "превосходить", "rare"],
  ["outgrow", "outgrew", "outgrown", "ˌaʊtˈɡrəʊ", "ˌaʊtˈɡruː", "ˌaʊtˈɡrəʊn", "перерастать", "rare"],
  ["outrun", "outran", "outrun", "ˌaʊtˈrʌn", "ˌaʊtˈræn", "ˌaʊtˈrʌn", "обгонять", "rare"],
  ["outsell", "outsold", "outsold", "ˌaʊtˈsel", "ˌaʊtˈsəʊld", "ˌaʊtˈsəʊld", "продавать больше", "rare"],
  ["outshine", "outshone", "outshone", "ˌaʊtˈʃaɪn", "ˌaʊtˈʃɒn", "ˌaʊtˈʃɒn", "затмевать", "rare"],
  ["outwit", "outwitted", "outwitted", "ˌaʊtˈwɪt", "ˌaʊtˈwɪtɪd", "ˌaʊtˈwɪtɪd", "перехитрить", "rare"],
  ["overbear", "overbore", "overborne", "ˌəʊvəˈbeər", "ˌəʊvəˈbɔːr", "ˌəʊvəˈbɔːn", "подавлять", "rare"],
  ["overcast", "overcast", "overcast", "ˌəʊvəˈkɑːst", "ˌəʊvəˈkɑːst", "ˌəʊvəˈkɑːst", "затягивать (тучами)", "rare"],
  ["overdo", "overdid", "overdone", "ˌəʊvəˈduː", "ˌəʊvəˈdɪd", "ˌəʊvəˈdʌn", "переусердствовать", "rare"],
  ["overdraw", "overdrew", "overdrawn", "ˌəʊvəˈdrɔː", "ˌəʊvəˈdruː", "ˌəʊvəˈdrɔːn", "превышать кредит", "rare"],
  ["overeat", "overate", "overeaten", "ˌəʊvərˈiːt", "ˌəʊvərˈeɪt", "ˌəʊvərˈiːtən", "переедать", "rare"],
  ["overhang", "overhung", "overhung", "ˌəʊvəˈhæŋ", "ˌəʊvəˈhʌŋ", "ˌəʊvəˈhʌŋ", "нависать", "rare"],
  ["overhear", "overheard", "overheard", "ˌəʊvəˈhɪər", "ˌəʊvəˈhɜːd", "ˌəʊvəˈhɜːd", "подслушать", "rare"],
  ["overlay", "overlaid", "overlaid", "ˌəʊvəˈleɪ", "ˌəʊvəˈleɪd", "ˌəʊvəˈleɪd", "покрывать, накладывать", "rare"],
  ["overlie", "overlay", "overlain", "ˌəʊvəˈlaɪ", "ˌəʊvəˈleɪ", "ˌəʊvəˈleɪn", "лежать поверх", "rare"],
  ["overpay", "overpaid", "overpaid", "ˌəʊvəˈpeɪ", "ˌəʊvəˈpeɪd", "ˌəʊvəˈpeɪd", "переплачивать", "rare"],
  ["override", "overrode", "overridden", "ˌəʊvəˈraɪd", "ˌəʊvəˈrəʊd", "ˌəʊvəˈrɪdən", "отменять, преобладать", "rare"],
  ["overrun", "overran", "overrun", "ˌəʊvəˈrʌn", "ˌəʊvəˈræn", "ˌəʊvəˈrʌn", "наводнять, вторгаться", "rare"],
  ["oversee", "oversaw", "overseen", "ˌəʊvəˈsiː", "ˌəʊvəˈsɔː", "ˌəʊvəˈsiːn", "надзирать", "rare"],
  ["overshoot", "overshot", "overshot", "ˌəʊvəˈʃuːt", "ˌəʊvəˈʃɒt", "ˌəʊvəˈʃɒt", "перелетать, промахиваться", "rare"],
  ["oversleep", "overslept", "overslept", "ˌəʊvəˈsliːp", "ˌəʊvəˈslept", "ˌəʊvəˈslept", "проспать", "rare"],
  ["overthrow", "overthrew", "overthrown", "ˌəʊvəˈθrəʊ", "ˌəʊvəˈθruː", "ˌəʊvəˈθrəʊn", "свергать", "rare"],
  ["partake", "partook", "partaken", "pɑːˈteɪk", "pɑːˈtʊk", "pɑːˈteɪkən", "принимать участие", "rare"],
  ["preset", "preset", "preset", "ˌpriːˈset", "ˌpriːˈset", "ˌpriːˈset", "предустанавливать", "rare"],
  ["proofread", "proofread", "proofread", "ˈpruːfriːd", "ˈpruːfred", "ˈpruːfred", "вычитывать, корректировать", "rare"],
  ["rebuild", "rebuilt", "rebuilt", "ˌriːˈbɪld", "ˌriːˈbɪlt", "ˌriːˈbɪlt", "перестраивать", "rare"],
  ["redo", "redid", "redone", "ˌriːˈduː", "ˌriːˈdɪd", "ˌriːˈdʌn", "переделывать", "rare"],
  ["relay", "relaid", "relaid", "ˌriːˈleɪ", "ˌriːˈleɪd", "ˌriːˈleɪd", "перекладывать", "rare"],
  ["remake", "remade", "remade", "ˌriːˈmeɪk", "ˌriːˈmeɪd", "ˌriːˈmeɪd", "переделывать", "rare"],
  ["rend", "rent", "rent", "rend", "rent", "rent", "раздирать", "rare"],
  ["repay", "repaid", "repaid", "rɪˈpeɪ", "rɪˈpeɪd", "rɪˈpeɪd", "возвращать (долг)", "rare"],
  ["rerun", "reran", "rerun", "ˌriːˈrʌn", "ˌriːˈræn", "ˌriːˈrʌn", "повторно показывать", "rare"],
  ["resell", "resold", "resold", "ˌriːˈsel", "ˌriːˈsəʊld", "ˌriːˈsəʊld", "перепродавать", "rare"],
  ["reset", "reset", "reset", "ˌriːˈset", "ˌriːˈset", "ˌriːˈset", "сбрасывать, перезагружать", "rare"],
  ["retake", "retook", "retaken", "ˌriːˈteɪk", "ˌriːˈtʊk", "ˌriːˈteɪkən", "снова брать, пересдавать", "rare"],
  ["retell", "retold", "retold", "ˌriːˈtel", "ˌriːˈtəʊld", "ˌriːˈtəʊld", "пересказывать", "rare"],
  ["rewind", "rewound", "rewound", "ˌriːˈwaɪnd", "ˌriːˈwaʊnd", "ˌriːˈwaʊnd", "перематывать", "rare"],
  ["rewrite", "rewrote", "rewritten", "ˌriːˈraɪt", "ˌriːˈrəʊt", "ˌriːˈrɪtən", "переписывать", "rare"],
  ["slay", "slew/slayed", "slain/slayed", "sleɪ", "sluː/sleɪd", "sleɪn/sleɪd", "убивать", "rare"],
  ["smite", "smote", "smitten", "smaɪt", "sməʊt", "ˈsmɪtən", "поражать, бить", "rare"],
  ["spoon-feed", "spoon-fed", "spoon-fed", "ˈspuːnfiːd", "ˈspuːnfed", "ˈspuːnfed", "кормить с ложки", "rare"],
  ["strew", "strewed", "strewn/strewed", "struː", "struːd", "struːn/struːd", "разбрасывать, усеивать", "rare"],
  ["sunburn", "sunburned/sunburnt", "sunburned/sunburnt", "ˈsʌnbɜːn", "ˈsʌnbɜːnd/ˈsʌnbɜːnt", "ˈsʌnbɜːnd/ˈsʌnbɜːnt", "обгорать на солнце", "rare"],
  ["troubleshoot", "troubleshot", "troubleshot", "ˈtrʌblʃuːt", "ˈtrʌblʃɒt", "ˈtrʌblʃɒt", "устранять неисправности", "rare"],
  ["typewrite", "typewrote", "typewritten", "ˈtaɪpraɪt", "ˈtaɪprəʊt", "ˈtaɪpˌrɪtən", "печатать на машинке", "rare"],
  ["unbind", "unbound", "unbound", "ˌʌnˈbaɪnd", "ˌʌnˈbaʊnd", "ˌʌnˈbaʊnd", "развязывать", "rare"],
  ["undergo", "underwent", "undergone", "ˌʌndəˈɡəʊ", "ˌʌndəˈwent", "ˌʌndəˈɡɒn", "подвергаться", "rare"],
  ["underlie", "underlay", "underlain", "ˌʌndəˈlaɪ", "ˌʌndəˈleɪ", "ˌʌndəˈleɪn", "лежать в основе", "rare"],
  ["undermine", "undermined", "undermined", "ˌʌndəˈmaɪn", "ˌʌndəˈmaɪnd", "ˌʌndəˈmaɪnd", "подрывать", "rare"],
  ["underpay", "underpaid", "underpaid", "ˌʌndəˈpeɪ", "ˌʌndəˈpeɪd", "ˌʌndəˈpeɪd", "недоплачивать", "rare"],
  ["undersell", "undersold", "undersold", "ˌʌndəˈsel", "ˌʌndəˈsəʊld", "ˌʌndəˈsəʊld", "продавать дешевле", "rare"],
  ["undertake", "undertook", "undertaken", "ˌʌndəˈteɪk", "ˌʌndəˈtʊk", "ˌʌndəˈteɪkən", "предпринимать", "rare"],
  ["underwrite", "underwrote", "underwritten", "ˌʌndəˈraɪt", "ˌʌndəˈrəʊt", "ˌʌndəˈrɪtən", "подписывать, страховать", "rare"],
  ["undo", "undid", "undone", "ˌʌnˈduː", "ˌʌnˈdɪd", "ˌʌnˈdʌn", "отменять, развязывать", "rare"],
  ["unfreeze", "unfroze", "unfrozen", "ˌʌnˈfriːz", "ˌʌnˈfrəʊz", "ˌʌnˈfrəʊzən", "размораживать", "rare"],
  ["unwind", "unwound", "unwound", "ˌʌnˈwaɪnd", "ˌʌnˈwaʊnd", "ˌʌnˈwaʊnd", "разматывать, расслабляться", "rare"],
  ["uphold", "upheld", "upheld", "ʌpˈhəʊld", "ʌpˈheld", "ʌpˈheld", "поддерживать", "rare"],
  ["upset", "upset", "upset", "ʌpˈset", "ʌpˈset", "ʌpˈset", "расстраивать, опрокидывать", "rare"],
  ["waylay", "waylaid", "waylaid", "ˌweɪˈleɪ", "ˌweɪˈleɪd", "ˌweɪˈleɪd", "подстерегать", "rare"],
  ["withhold", "withheld", "withheld", "wɪðˈhəʊld", "wɪðˈheld", "wɪðˈheld", "удерживать, утаивать", "rare"],
  ["withstand", "withstood", "withstood", "wɪðˈstænd", "wɪðˈstʊd", "wɪðˈstʊd", "выдерживать, противостоять", "rare"],
].map(([base, past, pp, tr, trPast, trPP, ru, level]) => ({ base, past, pp, tr, trPast, trPP, ru, level }));

const LEVEL_LABELS = {
  basic: "Базовые",
  advanced: "Продвинутые",
  rare: "Редкие",
};

const COMMON_VERBS = new Set([
  "be", "become", "begin", "break", "bring", "build", "buy", "catch", "choose", "come",
  "cut", "do", "draw", "drink", "drive", "eat", "fall", "feel", "find", "fly",
  "forget", "forgive", "get", "give", "go", "grow", "have", "hear", "hide", "hit",
  "hold", "hurt", "keep", "know", "learn", "leave", "lend", "let", "lose", "make",
  "mean", "meet", "pay", "put", "read", "ride", "ring", "run", "say", "see",
  "sell", "send", "set", "show", "shut", "sing", "sit", "sleep", "speak", "spend",
  "stand", "swim", "take", "teach", "tell", "think", "throw", "understand", "wake", "wear",
  "win", "write", "bite", "burn", "fight", "lead", "lie", "rise", "shake", "shoot",
  "steal", "tear", "bend", "bet", "blow", "deal", "dig", "dream", "feed", "freeze",
  "hang", "lay", "lean", "leap", "light", "quit", "seek", "shine", "sink", "slide",
  "smell", "spin", "split", "spread", "spring", "stick", "sting", "strike", "swear",
  "sweep", "swing", "withdraw",
]);

const VERB_EXAMPLES = {
  // ─── BASIC ───────────────────────────────────────────────────────────────
  be: {
    base: "Don't be so hard on yourself — everyone makes mistakes, especially when they're just starting out.",
    past: "The whole atmosphere was incredibly tense, and nobody dared say a word for what felt like ages.",
    perfect: "I've been stuck in traffic for over an hour now, and I'm honestly about to lose my mind.",
  },
  become: {
    base: "People become surprisingly stubborn once they've already made up their minds about something.",
    past: "The conversation quickly became awkward when someone brought up politics at the dinner table.",
    perfect: "Working from home has become the new normal for most of us since the pandemic.",
  },
  begin: {
    base: "Let's begin with the most urgent items on the agenda so we don't run out of time.",
    past: "It began as a casual side project, but within a year it turned into a full-time business.",
    perfect: "They've begun sending out invitations, so I guess there's no turning back now.",
  },
  break: {
    base: "Honestly, I break at least one glass every time we have people over for dinner.",
    past: "He broke the news to her gently, but she still didn't take it well at all.",
    perfect: "Someone has broken into the car parked outside — there's glass all over the pavement.",
  },
  bring: {
    base: "Bring your own laptop to the meeting because the office ones are painfully slow.",
    past: "She brought up a really good point that none of us had even thought about before.",
    perfect: "The new policy has brought nothing but confusion, and honestly nobody knows what's going on.",
  },
  build: {
    base: "We build all our prototypes in-house before sending them off for mass production.",
    past: "They built the entire app over a single weekend during a hackathon, which was honestly impressive.",
    perfect: "She's built a reputation for herself that most people in the industry would kill for.",
  },
  buy: {
    base: "I always buy way too much food when I go grocery shopping on an empty stomach.",
    past: "She bought the most ridiculously expensive coffee machine I've ever seen, and honestly it was worth every penny.",
    perfect: "I've already bought tickets for the whole group, so don't even worry about it.",
  },
  catch: {
    base: "I never catch the earlier train no matter how hard I try — it's like a curse at this point.",
    past: "She caught him off guard with that question, and you could tell he had no idea what to say.",
    perfect: "We've caught a few bugs in the code that could've caused serious problems down the road.",
  },
  choose: {
    base: "I always choose the window seat because I can't stand being in the middle on a long flight.",
    past: "She chose her words very carefully, knowing that one wrong move could ruin everything.",
    perfect: "They've chosen a venue that's way out of town, which means everyone's going to have to drive.",
  },
  come: {
    base: "Come grab a coffee with me — I need a break from staring at this screen all day.",
    past: "He came rushing in fifteen minutes late, completely out of breath and soaking wet from the rain.",
    perfect: "The results have finally come in, and they're way better than any of us expected.",
  },
  cost: {
    base: "These little subscriptions all cost five or ten bucks a month, but they really add up fast.",
    past: "That one mistake cost the company thousands and nearly got the whole team fired.",
    perfect: "This renovation has cost us way more than we originally budgeted for, and we're not even halfway done.",
  },
  cut: {
    base: "I'll cut straight to the point — we're running behind schedule and something needs to change.",
    past: "She cut him off mid-sentence, which was incredibly rude, but honestly he was rambling.",
    perfect: "They've cut the entire department's budget by thirty percent, so things are about to get interesting.",
  },
  do: {
    base: "We do everything we can to make new employees feel welcome during their first week.",
    past: "He did all the heavy lifting on that project while the rest of us barely contributed.",
    perfect: "Have you done anything like this before, or is this your first time working with this kind of data?",
  },
  draw: {
    base: "I draw little doodles in the margins of my notebook during every single meeting — it helps me focus.",
    past: "She drew the curtains and sat down in the dark, clearly not in the mood to talk to anyone.",
    perfect: "The exhibition has drawn massive crowds from all over the country, which nobody really expected.",
  },
  drink: {
    base: "We usually drink a couple of beers on the balcony after work when the weather's nice.",
    past: "We drank way too much at the office party and spent the entire next day regretting it.",
    perfect: "I've drunk so much coffee today that my hands are literally shaking.",
  },
  drive: {
    base: "I drive my kids to school every morning and then sit in traffic for another forty minutes on the way back.",
    past: "She drove all the way across the country just to surprise him for his birthday — that's dedication.",
    perfect: "He's driven that same route for twenty years and still manages to miss the exit sometimes.",
  },
  eat: {
    base: "Let's eat before everything gets cold — we can talk about it over dinner.",
    past: "We ate at this tiny little place tucked away in an alley, and it turned out to be the best meal of the trip.",
    perfect: "I've already eaten, but I'll sit with you and grab a coffee or something.",
  },
  fall: {
    base: "I fall asleep on the couch almost every night because I'm too tired to make it to the bedroom.",
    past: "He fell for the scam hook, line, and sinker — gave them his credit card details and everything.",
    perfect: "Property prices have fallen significantly since last year, so it might actually be a good time to buy.",
  },
  feel: {
    base: "I feel like we're going in circles here — can we just make a decision and move on?",
    past: "She felt completely out of her depth during the first few weeks, but she got the hang of it eventually.",
    perfect: "I've never felt so relieved in my entire life — I genuinely thought we were going to miss the deadline.",
  },
  find: {
    base: "I find it really hard to concentrate when people are having loud conversations right next to me.",
    past: "She found out about the surprise party because someone accidentally left the group chat open on their phone.",
    perfect: "Have you found a place to stay yet, or are you still looking at Airbnbs?",
  },
  fly: {
    base: "We usually fly economy because honestly the price difference just isn't worth it for a short trip.",
    past: "She flew halfway across the world for a job interview, which really shows how serious she was about it.",
    perfect: "He's flown with that airline so many times that he's got enough points for a free first-class upgrade.",
  },
  forget: {
    base: "Don't forget your jacket — it's supposed to drop below zero tonight and you'll freeze out there.",
    past: "I completely forgot we had plans, and by the time I remembered it was already too late to cancel.",
    perfect: "She's forgotten her password again, which is the third time this month — we really need a password manager.",
  },
  forgive: {
    base: "I forgive people pretty easily, but I never forget, and that's something I'm still working on.",
    past: "He forgave her almost immediately, even though what she said was genuinely hurtful.",
    perfect: "I've forgiven him for what happened, but things between us haven't really been the same since.",
  },
  get: {
    base: "I get so anxious before flights that I usually show up at the airport three hours early.",
    past: "She got stuck in the elevator for forty-five minutes and had to call building security to get her out.",
    perfect: "He's gotten way more confident since he started the new job — you can really see the difference.",
  },
  give: {
    base: "Give me a heads-up before the meeting so I have time to pull together the latest numbers.",
    past: "They gave us barely twenty-four hours to prepare the whole presentation from scratch.",
    perfect: "She's given that same excuse so many times that nobody even believes her anymore.",
  },
  go: {
    base: "Let's go somewhere quiet — I can barely hear myself think in this place.",
    past: "He went completely silent after she said that, and you could tell he was really hurt.",
    perfect: "Have you ever gone camping in the middle of winter? It sounds miserable, but it's actually amazing.",
  },
  grow: {
    base: "Kids grow out of their clothes so fast — I feel like I'm buying new shoes every other month.",
    past: "She grew up speaking three languages, which is why her accent is so hard to place.",
    perfect: "The team has grown from five people to over fifty in less than two years, which is kind of insane.",
  },
  have: {
    base: "We have absolutely no idea what we're doing, but we're figuring it out as we go along.",
    past: "We had the most amazing dinner at this little restaurant by the harbour that a friend recommended.",
    perfect: "I've had it up to here with these constant changes — every week it's something new.",
  },
  hear: {
    base: "I can't hear a thing over this music — let's step outside for a minute.",
    past: "She heard the whole conversation through the thin wall and pretended she didn't know a thing.",
    perfect: "Have you heard about the new policy they're rolling out next month? It's going to affect everyone.",
  },
  hide: {
    base: "I hide all my snacks in the back of the top shelf so my kids don't find them within five minutes.",
    past: "He hid his disappointment behind a smile, but anyone who knew him could see right through it.",
    perfect: "She's hidden the truth from everyone for years, and now it's all starting to come out.",
  },
  hit: {
    base: "Don't hit send on that email until I've had a chance to look it over — we can't afford any mistakes.",
    past: "The reality of the situation hit her all at once, and she just sat down and stared at the wall.",
    perfect: "That podcast has hit ten million downloads, which is absolutely wild for something that started as a hobby.",
  },
  hold: {
    base: "Hold on a second — I need to double-check something before we go any further with this.",
    past: "She held her ground during the argument even when everyone in the room disagreed with her.",
    perfect: "The old bridge has held up surprisingly well considering it was built over a hundred years ago.",
  },
  hurt: {
    base: "My back hurts every morning now, and I'm pretty sure it's because of this terrible office chair.",
    past: "What she said really hurt, even though she probably didn't realize how it came across.",
    perfect: "The scandal has hurt the company's reputation so badly that it could take years to recover.",
  },
  keep: {
    base: "I keep telling myself I'll start going to the gym, but something always comes up.",
    past: "She kept a straight face the entire time, even though the rest of us were dying of laughter.",
    perfect: "He's kept every single receipt from the trip, just in case he needs them for the expense report.",
  },
  know: {
    base: "I know it sounds crazy, but I swear I've seen that guy somewhere before — I just can't place him.",
    past: "She knew right away that something was off — the office was too quiet for a Monday morning.",
    perfect: "I've known her since primary school, and she's honestly one of the most genuine people I've ever met.",
  },
  learn: {
    base: "You learn something new about this city every time you take a different route home.",
    past: "He learned the hard way that you should always read the fine print before signing anything.",
    perfect: "She's learned more in six months on the job than she did in three years at university.",
  },
  leave: {
    base: "I always leave the office later than I plan to because there's always one more thing to finish.",
    past: "He left his phone on the train and didn't realize until he was already halfway home.",
    perfect: "Have you left enough time to get through security, or should we head to the airport now?",
  },
  lend: {
    base: "Can you lend me your charger for twenty minutes? My phone's about to die and I'm expecting an important call.",
    past: "She lent him her car for the weekend, and of course he brought it back with an empty tank.",
    perfect: "He's lent money to pretty much everyone in the group, and half of them still haven't paid him back.",
  },
  let: {
    base: "Let me handle this one — you've got enough on your plate already.",
    past: "They let us use the conference room for free, which saved us a fortune on the event budget.",
    perfect: "She's never let a deadline slip in all the years I've worked with her, not even once.",
  },
  lose: {
    base: "I lose track of time every time I sit down to work on something I actually enjoy.",
    past: "We lost power for three hours during the storm, and of course it happened right in the middle of dinner.",
    perfect: "He's lost his wallet twice this month alone — at this point I think he needs one of those tracking tiles.",
  },
  make: {
    base: "I'll make us some coffee while you finish setting up — it sounds like it's going to be a long morning.",
    past: "She made it very clear from the start that she wasn't interested in compromising on the budget.",
    perfect: "They've made so much progress this quarter that the original deadline actually looks achievable now.",
  },
  mean: {
    base: "I don't mean it in a bad way — I'm just saying we could probably do this more efficiently.",
    past: "He meant well, but the way he phrased it came across as really patronizing and it upset a few people.",
    perfect: "This opportunity has meant the world to her, and you can tell by how much effort she's been putting in.",
  },
  meet: {
    base: "Let's meet up after work and grab dinner somewhere — I know a great Thai place around the corner.",
    past: "We met completely by accident at a conference in Berlin, and we've been in touch ever since.",
    perfect: "Have you met the new guy on the data team? He seems really sharp and easy to get along with.",
  },
  pay: {
    base: "I'll pay you back as soon as I get paid — I promise I haven't forgotten about it.",
    past: "He paid for everyone's dinner without saying a word, and we only found out when we asked for the bill.",
    perfect: "Have you paid the rent yet, or should I send the transfer before the end of the day?",
  },
  put: {
    base: "Put your phone away during dinner — honestly, it's the one thing I ask.",
    past: "She put so much thought into every detail of the event that it genuinely felt like a professional production.",
    perfect: "He's put in countless hours of overtime this month, and it's really starting to show in his work.",
  },
  read: {
    base: "I read the news first thing every morning with my coffee before the rest of the house wakes up.",
    past: "She read the entire contract from start to finish, which is apparently something nobody else bothered to do.",
    perfect: "Have you read the email from the client yet? It's kind of urgent and we need to respond today.",
  },
  ride: {
    base: "I ride my bike to the office every day, rain or shine — it's the only exercise I get.",
    past: "We rode the train all the way up the coast, and the views were absolutely breathtaking the whole way.",
    perfect: "She's ridden that horse since she was about eight years old — they've got an incredible bond.",
  },
  ring: {
    base: "Ring me when you land so I know you got there safely — you know how much I worry.",
    past: "The phone rang right in the middle of his speech, and the whole room just went silent.",
    perfect: "I've rung the doctor's office three times today and nobody's picked up — it's driving me mad.",
  },
  run: {
    base: "I run along the river every morning at six, even when it's freezing — it's the only thing that clears my head.",
    past: "He ran into his ex at the grocery store, and apparently it was the most awkward five minutes of his life.",
    perfect: "We've completely run out of milk and bread, so someone needs to pop by the shop on the way home.",
  },
  say: {
    base: "People always say they'll keep in touch, but honestly most of them never actually do.",
    past: "She said the most beautiful thing at the funeral — there wasn't a dry eye in the room.",
    perfect: "He's said he's sorry a hundred times, but at some point you need actions, not just words.",
  },
  see: {
    base: "I'll see what I can do, but I'm not making any promises — this is going to be tricky.",
    past: "We saw the northern lights for the first time on that trip, and it was genuinely life-changing.",
    perfect: "Have you seen the state of the kitchen? It looks like a bomb went off in there.",
  },
  sell: {
    base: "They sell handmade jewellery at the weekend market, and honestly their stuff is gorgeous.",
    past: "He sold his entire vinyl collection to pay for the trip, which he still regrets to this day.",
    perfect: "The book has sold over two million copies worldwide, which is unreal for a debut novel.",
  },
  send: {
    base: "I'll send you the details as soon as I've confirmed everything with the venue — should be later today.",
    past: "She sent me the funniest meme right in the middle of a meeting, and I almost lost it trying not to laugh.",
    perfect: "Have you sent the report to the client yet, or are we still waiting on those final numbers?",
  },
  set: {
    base: "Let's set some ground rules before we start so everyone knows exactly what's expected.",
    past: "She set the bar incredibly high with her first project, and now everyone expects that level every time.",
    perfect: "He's set a new personal record, which is amazing considering he only started training six months ago.",
  },
  show: {
    base: "Show me what you've got so far, and we'll figure out the next steps together.",
    past: "The data showed a clear pattern that nobody had noticed before, and it completely changed our approach.",
    perfect: "She's shown incredible patience throughout the whole process — I honestly don't know how she does it.",
  },
  shut: {
    base: "Shut the laptop and actually enjoy your holiday — the emails will still be there when you get back.",
    past: "The restaurant shut down without any warning, and all the staff found out through social media.",
    perfect: "They've shut off the hot water for maintenance, so don't even bother trying to take a shower right now.",
  },
  sing: {
    base: "We always sing along to the same playlist on road trips — it's become a tradition at this point.",
    past: "She sang so beautifully at the wedding that half the guests were in tears by the end of the first song.",
    perfect: "Have you ever sung karaoke in front of complete strangers? It's terrifying and amazing at the same time.",
  },
  sit: {
    base: "Come sit with us — we've saved you a spot right next to the window.",
    past: "We sat in comfortable silence for a while, just watching the sun go down over the water.",
    perfect: "He's sat through that same presentation four times now, and he still has to pretend it's the first.",
  },
  sleep: {
    base: "I can never sleep the night before a big trip — my brain just won't shut off.",
    past: "She slept through her alarm, missed her flight, and somehow still made it to the meeting on time.",
    perfect: "I've barely slept all week because of the construction noise next door, and I'm running on pure caffeine.",
  },
  speak: {
    base: "I speak my mind even when I know people aren't going to like what they hear.",
    past: "She spoke with such confidence that everyone in the room assumed she'd been doing this for decades.",
    perfect: "Have you spoken to the landlord about the leak yet? It's getting worse by the day.",
  },
  spend: {
    base: "We spend way too much money eating out, but neither of us feels like cooking after a long day.",
    past: "They spent three months travelling through Southeast Asia and came back completely different people.",
    perfect: "He's spent his entire career in finance and still gets nervous before every big presentation.",
  },
  stand: {
    base: "I can't stand people who talk on speakerphone in public — it drives me absolutely insane.",
    past: "We stood outside in the pouring rain for forty minutes waiting for the doors to open.",
    perfect: "She's stood by him through the worst of it, and that kind of loyalty is rare these days.",
  },
  swim: {
    base: "Let's swim out to the rocks and back — it's not that far, and the water's perfect today.",
    past: "He swam across the lake and back before breakfast every single morning that summer.",
    perfect: "Have you ever swum in the sea at night? It's one of those things everyone should try at least once.",
  },
  take: {
    base: "Take a deep breath and just walk me through what happened from the very beginning.",
    past: "She took one look at the contract and immediately spotted three things that needed to change.",
    perfect: "He's taken on way too many projects at once, and I'm worried he's going to burn out.",
  },
  teach: {
    base: "I teach a beginners' photography class on Saturday mornings, and it's honestly the highlight of my week.",
    past: "She taught herself to code during lockdown using nothing but free YouTube tutorials and determination.",
    perfect: "That experience has taught me more about leadership than any management course ever could.",
  },
  tell: {
    base: "Tell me honestly — do you think this idea has any chance of actually working?",
    past: "He told the funniest story at dinner, and we were all laughing so hard we could barely breathe.",
    perfect: "I've told you a million times — don't leave the back door unlocked when you go to bed.",
  },
  think: {
    base: "I think we're overcomplicating this — sometimes the simplest solution is the right one.",
    past: "She thought about it for a long time before finally deciding to hand in her resignation.",
    perfect: "Have you thought about what you're going to say if they ask you about the gap on your CV?",
  },
  throw: {
    base: "Throw me the keys and I'll go warm up the car — it's freezing out there.",
    past: "He threw a surprise party for her thirtieth, and somehow managed to keep it a secret for three whole weeks.",
    perfect: "She's thrown herself into the new role with so much energy that everyone's genuinely impressed.",
  },
  understand: {
    base: "I completely understand where you're coming from, but I think there's a better way to handle this.",
    past: "She finally understood why he'd been so distant — he'd been dealing with everything completely on his own.",
    perfect: "I've never fully understood how she manages to juggle three kids, a full-time job, and a side business.",
  },
  wake: {
    base: "I always wake up twenty minutes before my alarm, no matter what time I go to bed.",
    past: "He woke up in the middle of the night to the sound of the smoke alarm going off downstairs.",
    perfect: "She's woken up on the wrong side of the bed every day this week — I'd just steer clear if I were you.",
  },
  wear: {
    base: "I wear the same three outfits on rotation and honestly nobody has ever noticed.",
    past: "She wore this incredible vintage dress to the gala, and literally everyone was asking her where she got it.",
    perfect: "He's worn that same leather jacket for as long as I've known him — it's practically part of his identity.",
  },
  win: {
    base: "They win pretty much every home game, but their away record is absolutely terrible.",
    past: "She won the argument without even raising her voice, which honestly made it even more impressive.",
    perfect: "We've never won this award before, so the whole team is over the moon right now.",
  },
  write: {
    base: "I write everything down in a notebook because I don't trust myself to remember anything otherwise.",
    past: "He wrote the entire first draft in two weeks, fuelled by nothing but coffee and sheer determination.",
    perfect: "She's written three bestsellers in a row, and the fourth one is already getting a ton of hype.",
  },
  bite: {
    base: "Don't bite your nails — you've been doing so well lately and I'd hate to see you start again.",
    past: "The mosquitoes bit us alive on that camping trip — I had welts all over my arms for a week.",
    perfect: "She's bitten off more than she can chew with this project, but she'd never admit that to anyone.",
  },
  burn: {
    base: "I always burn dinner when I try to cook and watch TV at the same time — you'd think I'd learn.",
    past: "He burned through his entire savings in about six months because he had no budget whatsoever.",
    perfect: "The candle has burned all the way down and there's wax all over the table — what a mess.",
  },
  fight: {
    base: "My kids fight over the most ridiculous things, like who gets to sit in the front seat.",
    past: "They fought tooth and nail to get that contract, and in the end it came down to the final presentation.",
    perfect: "She's fought her way to the top of the company, and she didn't have a single connection when she started.",
  },
  lead: {
    base: "I lead a small team of developers, and most of my day is spent in meetings or reviewing code.",
    past: "He led the whole expedition through some incredibly rough terrain without a single complaint.",
    perfect: "One small miscalculation has led to a chain reaction of delays that's thrown the whole schedule off.",
  },
  lie: {
    base: "I lie awake at night replaying conversations in my head and thinking about what I should have said.",
    past: "The cat lay on my keyboard for a solid hour and I didn't have the heart to move her.",
    perfect: "Those old files have lain untouched in the storage room for at least a decade — nobody even knows what's in them.",
  },
  rise: {
    base: "Energy prices rise every single winter, and there's absolutely nothing we can do about it.",
    past: "She rose through the ranks faster than anyone in the company's history, and it was entirely on merit.",
    perfect: "Sea levels have risen noticeably over the past few decades, and the effects are only going to get worse.",
  },
  shake: {
    base: "Shake the bottle really well before you pour it, otherwise all the good stuff settles at the bottom.",
    past: "He shook his head in disbelief when he saw the final bill — it was nearly double what they'd quoted.",
    perfect: "The news has shaken the entire community, and people are still trying to make sense of what happened.",
  },
  shoot: {
    base: "They shoot everything on location rather than in a studio, which gives the show a much more authentic feel.",
    past: "She shot the winning goal in the last thirty seconds, and the entire stadium completely lost it.",
    perfect: "He's shot over three hundred weddings in his career, and he says every single one still feels special.",
  },
  steal: {
    base: "Don't steal her thunder — she's been working on this presentation for weeks and she deserves the spotlight.",
    past: "Someone stole my bike right in front of the supermarket in broad daylight, and nobody even noticed.",
    perfect: "She's stolen the show at every performance this season — the reviews have been absolutely glowing.",
  },
  tear: {
    base: "I always tear up during the last scene of that film, no matter how many times I've seen it.",
    past: "He tore his ACL during the match and was out for the rest of the season — absolutely devastating.",
    perfect: "This whole situation has torn the team apart, and I honestly don't know how we're going to fix it.",
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────────────
  arise: {
    base: "These kinds of misunderstandings can arise when people don't communicate their expectations upfront.",
    past: "A completely unexpected opportunity arose right when she was about to give up on the whole thing.",
    perfect: "A new issue has arisen with the latest software update, and nobody can figure out what's causing it.",
  },
  awake: {
    base: "I always awake with a start whenever there's a thunderstorm in the middle of the night.",
    past: "She awoke in the middle of the night to find the front door wide open, which freaked her out completely.",
    perfect: "The country has awoken to a completely different political landscape after last night's election results.",
  },
  bear: {
    base: "I can't bear listening to him complain about the same thing every single day — it's exhausting.",
    past: "She bore the weight of the entire project on her shoulders while the rest of us were dealing with other things.",
    perfect: "He's borne that responsibility alone for far too long, and it's clearly starting to take a toll on him.",
  },
  bend: {
    base: "The old floorboards bend and creak every time someone walks across the room at night.",
    past: "He bent the rules just enough to get the deal done without technically breaking any policies.",
    perfect: "The rules have been bent so many times at this point that nobody even remembers what the originals were.",
  },
  bet: {
    base: "I wouldn't bet on them finishing on time — they've missed the last three deadlines in a row.",
    past: "She bet her entire bonus on a risky stock, and against all odds it actually paid off.",
    perfect: "He's bet on the wrong outcome so many times that he's finally learned to play it safe.",
  },
  bind: {
    base: "These terms legally bind every single party involved, so make sure you actually read them before signing.",
    past: "The handshake deal bound them to a partnership that lasted over twenty years and made them both rich.",
    perfect: "The non-compete agreement has bound her to the company for another two years, which she deeply regrets.",
  },
  bleed: {
    base: "Paper cuts bleed way more than you'd expect for something so tiny — it's honestly ridiculous.",
    past: "His nose bled for a good twenty minutes after the fall, and we were starting to get genuinely worried.",
    perfect: "The wound has bled through two layers of bandage already, so we should probably get it looked at.",
  },
  blow: {
    base: "Blow on it first — the soup is way too hot and you'll burn your tongue if you're not careful.",
    past: "The wind blew the umbrella clean out of my hands, and I had to chase it halfway down the street.",
    perfect: "The storm has blown over, but the garden is an absolute mess — there are branches everywhere.",
  },
  breed: {
    base: "They breed award-winning labradors on a farm just outside the city, and there's a waiting list a mile long.",
    past: "Her family bred racehorses for three generations before they finally sold the estate.",
    perfect: "This particular variety has been bred specifically to withstand harsh winters, which makes it perfect for this climate.",
  },
  broadcast: {
    base: "They broadcast the football live every Saturday evening, and the whole pub goes absolutely mental.",
    past: "The station broadcast the breaking news within minutes of the story breaking, before anyone else had it.",
    perfect: "The prime minister's speech has been broadcast in over thirty countries, which is unprecedented for something like this.",
  },
  burst: {
    base: "Don't squeeze that any harder or it'll burst — and trust me, you don't want that all over your shirt.",
    past: "She burst out laughing in the middle of the meeting, and honestly the timing couldn't have been worse.",
    perfect: "A water pipe has burst in the basement, and the whole ground floor is about two inches deep in water.",
  },
  cast: {
    base: "The old oak trees cast these gorgeous long shadows across the garden in the late afternoon light.",
    past: "She cast a quick glance over her shoulder to make sure nobody was following her down the alley.",
    perfect: "The director has cast a completely unknown actress in the lead role, and everyone's buzzing about it.",
  },
  cling: {
    base: "Some people cling to outdated ideas even when the evidence is staring them right in the face.",
    past: "She clung to the railing with both hands as the boat rocked violently from side to side.",
    perfect: "The smell of smoke has clung to every piece of clothing I own since that bonfire last weekend.",
  },
  creep: {
    base: "Doubts always creep in right before a big decision, no matter how confident you were five minutes ago.",
    past: "He crept into the house at three in the morning, hoping nobody would hear the front door.",
    perfect: "A quiet sense of unease has crept over the entire team since they announced the restructuring.",
  },
  deal: {
    base: "I'll deal with the suppliers first thing Monday morning — I've already got a plan for how to handle it.",
    past: "She dealt with the angry customer so calmly and professionally that even the manager was impressed.",
    perfect: "He's dealt with far worse situations than this, so I'm not worried about him handling the pressure.",
  },
  dig: {
    base: "The dogs dig up the flower beds every time I let them out, and I've completely given up trying to stop them.",
    past: "We dug through three boxes of old paperwork before we finally found the original contract.",
    perfect: "Archaeologists have dug up a Roman mosaic right in the middle of a construction site, and the whole project's on hold.",
  },
  dream: {
    base: "I dream about that holiday in Greece all the time — it was genuinely the best week of my life.",
    past: "She dreamed she was giving a presentation in front of thousands of people and woke up in a cold sweat.",
    perfect: "He's dreamed of opening his own restaurant since he was a kid, and now it's finally happening.",
  },
  feed: {
    base: "I feed the cat the second I walk through the door, because otherwise she follows me around meowing non-stop.",
    past: "She fed the kids early and put them to bed so we could actually have a proper conversation for once.",
    perfect: "Have you fed the dog yet, or is he going to stare at me like that for the rest of the evening?",
  },
  flee: {
    base: "Residents flee the coastal areas every hurricane season, and most of them don't come back until it's all clear.",
    past: "Thousands of people fled the city overnight as the wildfires moved closer and the air became unbreathable.",
    perfect: "Entire communities have fled the region in the past few weeks, and the roads are still packed with traffic.",
  },
  fling: {
    base: "Don't just fling your bag on the kitchen table — there's food out and I've literally just cleaned up.",
    past: "She flung her arms around him the second he walked through the door, nearly knocking him off his feet.",
    perfect: "He's flung himself into the new project with so much enthusiasm that the rest of the team can barely keep up.",
  },
  forbid: {
    base: "Company policy strictly forbids sharing login credentials, even with people on your own team.",
    past: "Her parents forbade her from going to the festival, so she stayed home and sulked the entire weekend.",
    perfect: "The court has forbidden any further contact between the two parties until the investigation is complete.",
  },
  forecast: {
    base: "Most analysts forecast a pretty rough quarter ahead, so we should probably start tightening the budget now.",
    past: "They forecast clear skies all weekend, and for once the weather people actually got it right.",
    perfect: "The finance team has forecast record revenue for the next fiscal year, and the board is cautiously optimistic.",
  },
  freeze: {
    base: "The pipes will freeze overnight if the heating goes off, and that's the last thing we need right now.",
    past: "She froze completely when they called her name — it took her a good five seconds to even stand up.",
    perfect: "Fuel prices have frozen at their current level, but nobody's expecting that to last very long.",
  },
  grind: {
    base: "I grind my own beans every morning because the pre-ground stuff just doesn't compare — I know, I'm a snob.",
    past: "He ground his teeth in frustration as he listened to them explain why the project was delayed yet again.",
    perfect: "She's ground her way through three incredibly tough years of medical school, and she's almost at the finish line.",
  },
  hang: {
    base: "I always hang my jacket on the back of my chair instead of using the coat rack like a normal person.",
    past: "He hung around the office long after everyone else had left, pretending to be busy when he clearly wasn't.",
    perfect: "That painting has hung in the same spot above the fireplace for as long as anyone in the family can remember.",
  },
  kneel: {
    base: "I kneel down next to the bed every time my kid asks me to check for monsters — it's our little nightly ritual.",
    past: "She knelt beside him on the wet pavement and held his hand until the ambulance arrived.",
    perfect: "He's knelt at that altar every single Sunday for thirty years without missing once — that's real dedication.",
  },
  knit: {
    base: "I knit for about an hour every evening while watching telly — it's the most relaxing part of my whole day.",
    past: "My grandmother knitted a different coloured scarf for every single grandchild so we could tell them apart.",
    perfect: "She's knitted something like fifteen hats this winter and given them all away to people at the homeless shelter.",
  },
  lay: {
    base: "Just lay your stuff on the spare bed for now — we'll sort out the wardrobe situation in the morning.",
    past: "She laid the baby down so gently that he didn't even stir, which felt like a small miracle.",
    perfect: "They've laid all the groundwork for the new building, and construction should start within the next few weeks.",
  },
  lean: {
    base: "You can lean on me whenever things get tough — that's literally what friends are for.",
    past: "He leaned back in his chair, put his feet on the desk, and looked like he didn't have a care in the world.",
    perfect: "She's leaned on her family a lot this year, and they've been absolutely incredible through all of it.",
  },
  leap: {
    base: "Cats leap between rooftops like it's nothing, and it genuinely terrifies me every time I see it.",
    past: "He leapt over the fence in one smooth motion, which was impressive given that he's pushing fifty.",
    perfect: "Technology has leapt so far forward in the past decade that half the gadgets from 2015 are basically antiques.",
  },
  light: {
    base: "Light the barbecue about half an hour before the guests arrive so it's properly hot by the time we need it.",
    past: "She lit every candle in the room, dimmed the overhead lights, and the whole place looked absolutely magical.",
    perfect: "The entire city has been lit up with decorations for the festival, and it looks genuinely spectacular at night.",
  },
  mistake: {
    base: "People constantly mistake me for my older brother, which is either flattering or insulting depending on your perspective.",
    past: "I mistook her sarcasm for a genuine compliment and thanked her, which made the whole thing ten times more awkward.",
    perfect: "He's been mistaken for a local so many times on this trip that he's stopped correcting people altogether.",
  },
  mow: {
    base: "I mow the lawn every Saturday morning like clockwork, even though my neighbour's is always somehow tidier.",
    past: "He mowed the entire garden in under an hour, which was suspicious because it usually takes him the whole afternoon.",
    perfect: "Have you mowed the back garden yet? It's starting to look like a jungle out there.",
  },
  overcome: {
    base: "We overcome these kinds of setbacks by sticking together and not pointing fingers at each other.",
    past: "He overcame a genuinely difficult childhood and went on to build one of the most successful companies in the country.",
    perfect: "They've overcome every single obstacle that's been thrown at them this year, and they're stronger for it.",
  },
  overtake: {
    base: "Electric vehicles overtake traditional cars in sales figures more and more every quarter — the shift is undeniable.",
    past: "She overtook the race leader in the final lap with a move that had the commentators absolutely screaming.",
    perfect: "Streaming has completely overtaken traditional television at this point — I don't even remember the last time I watched live TV.",
  },
  prove: {
    base: "The numbers consistently prove that investing early makes a massive difference in the long run.",
    past: "She proved every single one of her critics wrong, and the look on their faces was priceless.",
    perfect: "He's proved himself time and time again, and I think it's about time we gave him the promotion he deserves.",
  },
  quit: {
    base: "I quit things the moment they stop bringing me joy — life's too short to keep doing stuff you hate.",
    past: "She quit her six-figure corporate job to open a bakery, and everyone thought she'd lost her mind.",
    perfect: "He's quit smoking at least four times now, and I'm genuinely rooting for him to make it stick this time.",
  },
  rid: {
    base: "How do you actually rid your house of that musty smell? I've tried everything and nothing seems to work.",
    past: "She rid herself of every single thing that reminded her of that chapter of her life, and honestly she seems happier for it.",
    perfect: "We've finally rid the garden of all the weeds, and for the first time in months it actually looks presentable.",
  },
  saw: {
    base: "I saw the old branches into smaller pieces every autumn and stack them up for firewood throughout the winter.",
    past: "He sawed through the thick plank slowly and carefully, making sure the cut was perfectly straight.",
    perfect: "She's sawed through much tougher wood than this with that old hand saw — don't underestimate her.",
  },
  seek: {
    base: "You should definitely seek a second opinion before making a decision this big — it's worth the extra time.",
    past: "They sought refuge in a tiny café when the heavens opened, and ended up staying for three hours.",
    perfect: "He's sought advice from every expert he knows, and they all seem to be saying the same thing.",
  },
  sew: {
    base: "I sew most of my own clothes these days because I got tired of paying a fortune for things that fall apart in a month.",
    past: "My grandmother sewed all the curtains in the house by hand, and they've somehow outlasted everything else.",
    perfect: "She's sewn her own outfits since she was a teenager, and some of them are nicer than anything you'd find in a shop.",
  },
  shine: {
    base: "The city lights shine so brightly at night that you can barely see a single star from the rooftop.",
    past: "The sun shone through the curtains and woke me up at half five — I really need to get blackout blinds.",
    perfect: "She's shone in every single role she's taken on, and the directors keep calling her back for more.",
  },
  shrink: {
    base: "Don't put that jumper in the dryer unless you want it to shrink three sizes — trust me, I learned the hard way.",
    past: "The budget shrank by almost half overnight, and suddenly we had to rethink the entire project from scratch.",
    perfect: "The team has shrunk from twenty people to just eight, and somehow we're still expected to hit the same targets.",
  },
  sink: {
    base: "My heart always sinks a little when I see an unread email from the boss land in my inbox on a Friday afternoon.",
    past: "He sank into the sofa after a twelve-hour shift and didn't move for the rest of the evening.",
    perfect: "Morale has sunk to an all-time low since they announced the layoffs, and you can feel it in every meeting.",
  },
  slide: {
    base: "These new wardrobe doors slide open so smoothly — it was definitely worth paying a bit extra for the upgrade.",
    past: "She slid a handwritten note under the door and disappeared before anyone even noticed she was there.",
    perfect: "The whole situation has slid completely out of control, and at this point I'm not sure anyone knows how to fix it.",
  },
  slit: {
    base: "I always slit the envelope open with a letter opener because ripping them makes me feel like a barbarian.",
    past: "She slit the packaging open with a box cutter and pulled out the most beautifully wrapped gift inside.",
    perfect: "Someone has slit the screen on the back door, and now every mosquito in the neighbourhood has found its way in.",
  },
  smell: {
    base: "Come over here and smell this candle — it's supposed to be lavender but it honestly smells like a swimming pool.",
    past: "The whole house smelled of fresh-baked bread when we walked in, and it was the most welcoming thing ever.",
    perfect: "Something has smelled off in the fridge for about three days now, and I'm genuinely afraid to investigate.",
  },
  sneak: {
    base: "I sometimes sneak a biscuit from the tin when nobody's looking, even though I told everyone I'm on a diet.",
    past: "He sneaked out the back door halfway through the party because he couldn't face another round of small talk.",
    perfect: "She's snuck off to the cinema twice this week instead of working from home — don't tell anyone I told you.",
  },
  sow: {
    base: "You reap what you sow in this business — cut corners now and it'll come back to bite you later.",
    past: "They sowed the wildflower seeds along the entire length of the fence, and by July the whole garden was in bloom.",
    perfect: "One careless remark has sown so much doubt in everyone's mind that the team morale is basically in freefall.",
  },
  speed: {
    base: "People absolutely speed through this residential street like it's a motorway, and it drives the whole neighbourhood mad.",
    past: "The taxi sped through every amber light trying to get us to the airport, and honestly I've never been so terrified.",
    perfect: "Development has sped up dramatically since we brought the new team on board — the difference is night and day.",
  },
  spell: {
    base: "Spell it out for me slowly because I always get the vowels mixed up in your last name.",
    past: "She spelled everything out in painstaking detail so there'd be absolutely no room for misinterpretation.",
    perfect: "I've spelled that client's name wrong in every single email, and nobody's bothered to correct me until now.",
  },
  spill: {
    base: "I spill something on myself basically every time I wear a white shirt — it's like a law of physics at this point.",
    past: "He spilled red wine all over the brand-new carpet, and the look on his face was absolute horror.",
    perfect: "Someone has spilled coffee on the conference room table again, and nobody seems willing to claim responsibility.",
  },
  spin: {
    base: "My head always spins when I try to make sense of these financial reports — the numbers just blur together.",
    past: "She spun around in her chair to face me and said exactly what everyone else was thinking but nobody had the guts to say.",
    perfect: "The media has spun the whole story so far out of proportion that it barely resembles what actually happened.",
  },
  spit: {
    base: "Don't spit out the olive pits on the table — there's a bowl right there for a reason.",
    past: "He spat his coffee out across the keyboard when he read the email — I wish I was exaggerating but I'm not.",
    perfect: "The old printer has been spitting out jammed paper all morning, and IT still hasn't come to fix it.",
  },
  split: {
    base: "Let's just split the bill evenly — it's easier than trying to figure out who had what.",
    past: "They split up after almost ten years together, and nobody saw it coming — they seemed like the perfect couple.",
    perfect: "This whole debate has split the community right down the middle, and feelings are running incredibly high.",
  },
  spoil: {
    base: "Don't spoil the ending for me — I'm only halfway through the series and I've been avoiding social media all week.",
    past: "The rain absolutely spoiled the picnic, and we ended up eating soggy sandwiches in the car like sad people.",
    perfect: "Her grandparents have spoiled her rotten since the day she was born, and now she thinks the whole world revolves around her.",
  },
  spread: {
    base: "Bad news always spreads like wildfire in this office — you can't sneeze without the whole floor knowing about it.",
    past: "She spread the map out across the kitchen table, and we spent the entire evening planning the road trip.",
    perfect: "The rumour has spread through every department in the building, and now everybody's asking questions.",
  },
  spring: {
    base: "Trendy new coffee shops spring up on every corner in this neighbourhood — I swear there's a new one every week.",
    past: "He sprang up from his chair the second the phone rang, like he'd been waiting for that call all day.",
    perfect: "Dozens of start-ups have sprung up in this area over the last couple of years, and the whole vibe of the street has changed.",
  },
  squeeze: {
    base: "Squeeze the lime over the top right before you serve it — it makes all the difference, trust me.",
    past: "She squeezed into the last remaining seat on the train and let out the biggest sigh of relief.",
    perfect: "They've squeezed every possible penny out of this budget, and there's genuinely nothing left to cut.",
  },
  stick: {
    base: "Just stick with the original plan — we've changed direction too many times already and it's costing us.",
    past: "The label stuck to my fingers and I couldn't peel it off, which was way more frustrating than it should've been.",
    perfect: "That melody has stuck in my head for three days straight, and I can't even remember where I heard it.",
  },
  sting: {
    base: "Jellyfish will sting you without any warning if you accidentally brush up against them in the water.",
    past: "A wasp stung her right on the back of the neck while she was sitting outside having lunch.",
    perfect: "His criticism has stung far more than he probably intended, and she hasn't been the same since the meeting.",
  },
  stink: {
    base: "These trainers absolutely stink after that run — I should probably just throw them in the washing machine.",
    past: "The whole kitchen stank of burnt garlic for two solid days after my attempt at making pasta from scratch.",
    perfect: "Something in the office has stunk all week, and maintenance still can't figure out where it's coming from.",
  },
  stride: {
    base: "I stride through the park every morning on my way to the station — it's the nicest part of my commute.",
    past: "She strode into the boardroom with total confidence and delivered the presentation like she'd done it a thousand times.",
    perfect: "He's stridden ahead of the competition so far that nobody's even close to catching up at this point.",
  },
  strike: {
    base: "Lightning can strike the same place twice, and apparently this office is proof — we've had two power outages this month.",
    past: "The idea struck her at three in the morning, and she grabbed her phone and typed out the whole plan before she forgot.",
    perfect: "The union has struck a deal with management that seems fair to both sides, which is honestly a first.",
  },
  string: {
    base: "Let me string these fairy lights along the balcony railing — it'll look gorgeous once the sun goes down.",
    past: "She strung the photos on a line across the living room wall, and it gave the whole place a really personal touch.",
    perfect: "He's strung together five consecutive wins this season, and the coach is finally giving him the recognition he deserves.",
  },
  strive: {
    base: "We strive for transparency in everything we do, even when the honest answer isn't what people want to hear.",
    past: "She strove to treat every single student equally, regardless of their background or ability level.",
    perfect: "They've striven for perfection since day one, and that commitment is exactly what sets them apart from everyone else.",
  },
  swear: {
    base: "I swear I left my keys right here on the counter — someone must have moved them, because they've vanished.",
    past: "He swore under his breath when he realized he'd left his wallet in the taxi that had already driven off.",
    perfect: "She's sworn off caffeine for the third time this year, but I give it about a week before she caves.",
  },
  sweep: {
    base: "Sweep the front steps before the guests arrive — there are leaves everywhere and it looks terrible.",
    past: "She swept into the room like she owned the place, and every single head turned in her direction.",
    perfect: "A massive wave of nostalgia has swept over me since I found those old photos in the attic.",
  },
  swell: {
    base: "Your ankle will swell up like a balloon if you don't put ice on it straight away — I'm speaking from experience.",
    past: "The crowd swelled to well over fifty thousand by kick-off, and the atmosphere was absolutely electric.",
    perfect: "The river has swelled dangerously after three days of non-stop rain, and several roads near the bank are already flooded.",
  },
  swing: {
    base: "The kids swing on that old tyre in the garden for hours — it's honestly the best twenty quid I've ever spent.",
    past: "He swung the front door open before I even had a chance to knock, like he'd been standing there waiting.",
    perfect: "Public opinion has swung dramatically in their favour since the interview went viral last week.",
  },
  thrust: {
    base: "Don't thrust your opinions on people who haven't asked for them — it never goes down well, trust me.",
    past: "She thrust the envelope into my hands and walked off without saying a single word, which was very unlike her.",
    perfect: "He never wanted any of this attention — fame has been thrust upon him, and he's still figuring out how to deal with it.",
  },
  tread: {
    base: "Tread carefully with what you say next, because she's already upset and one wrong word could make everything worse.",
    past: "I trod on a piece of Lego in the dark last night and genuinely thought I was going to pass out from the pain.",
    perfect: "No one has trodden this path in what looks like years — the whole trail is completely overgrown.",
  },
  weave: {
    base: "She can weave the most intricate patterns by hand in under an hour, which honestly blows my mind every time.",
    past: "He wove through the rush-hour traffic on his bicycle like it was an obstacle course he'd practiced a hundred times.",
    perfect: "The director has woven three completely separate storylines together so seamlessly that you barely notice the transitions.",
  },
  weep: {
    base: "I always weep at that scene in the film where they say goodbye — it gets me every single time without fail.",
    past: "She wept quietly at the back of the church while everyone else was singing, and it absolutely broke my heart.",
    perfect: "He's wept more tears over this whole situation than anyone will ever know — he just doesn't show it in public.",
  },
  wind: {
    base: "I wind the old grandfather clock in the hallway every Sunday morning — it's been a family tradition for decades.",
    past: "The narrow road wound through the hills for miles, and every bend revealed a view more stunning than the last.",
    perfect: "She's wound herself up into such a state over something so minor that I don't even know where to begin calming her down.",
  },
  withdraw: {
    base: "I withdraw a set amount of cash every Friday because I find it way easier to stick to a budget that way.",
    past: "He quietly withdrew from the competition citing personal reasons, and nobody's heard from him since.",
    perfect: "Several sponsors have already been withdrawn from the event following the controversy, and more are expected to pull out.",
  },
  wring: {
    base: "Wring the cloth out properly before you wipe the table down, otherwise you'll just smear water everywhere.",
    past: "She wrung her hands nervously the entire time she was waiting for the results, and I could barely watch.",
    perfect: "They've wrung every last drop of value out of that contract, and at this point there's simply nothing left to negotiate.",
  },

  // ─── RARE ─────────────────────────────────────────────────────────────────
  abide: {
    base: "I can't abide people who chew with their mouths open — it genuinely makes me want to leave the table.",
    past: "He abode by the terms of the agreement even when it clearly wasn't in his favour anymore.",
    perfect: "She's always abided by her own moral code, even when it would've been easier to just go along with the crowd.",
  },
  alight: {
    base: "Passengers must alight at the next stop if they want the connecting bus — there won't be another one for an hour.",
    past: "She alighted from the carriage with such elegance that everyone on the platform turned to look.",
    perfect: "A beautiful hawk has alighted on the fence post outside my window, and I'm scared to move in case it flies off.",
  },
  backslide: {
    base: "People often backslide into old habits the moment the pressure lets up, which is totally normal.",
    past: "He backslid into his old routine of staying up until 3 a.m. after just one stressful week at work.",
    perfect: "She's backslid on nearly every health goal she set in January, but she's not beating herself up about it.",
  },
  befall: {
    base: "Nobody can predict what misfortune might befall a company when the market shifts this dramatically.",
    past: "A series of truly unfortunate events befell the family that summer, one right after the other.",
    perfect: "An eerie silence has befallen the entire neighbourhood since they announced the factory closure.",
  },
  beget: {
    base: "In my experience, poor communication only begets more misunderstanding and resentment down the line.",
    past: "That one reckless policy decision begot a chain of problems that took years to untangle.",
    perfect: "Their initial success has begotten an entirely new set of challenges that nobody anticipated.",
  },
  behold: {
    base: "Behold the absolute chaos of my kitchen after I tried making a three-tier cake for the first time.",
    past: "They beheld the northern lights stretching across the sky in total silence, completely awestruck.",
    perfect: "No one in the group has ever beheld anything quite as breathtaking as that view from the summit.",
  },
  bereave: {
    base: "A loss like that can bereave someone of their will to carry on — it's not something you just bounce back from.",
    past: "The earthquake bereaved entire communities, leaving thousands of children without parents overnight.",
    perfect: "She's been bereft of any real support system since she moved abroad, and it's starting to show.",
  },
  beset: {
    base: "Self-doubt can beset even the most experienced professionals when the stakes are high enough.",
    past: "The expedition was beset by every possible complication — bad weather, broken equipment, and dwindling supplies.",
    perfect: "The region has been beset by severe flooding for three consecutive years, and the infrastructure is crumbling.",
  },
  beseech: {
    base: "I beseech you — please reconsider before you throw away everything you've worked so hard for.",
    past: "She besought him not to leave, but he'd already made up his mind and there was no changing it.",
    perfect: "He's beseeched the board for additional funding at every single meeting, and they keep turning him down.",
  },
  bestride: {
    base: "Very few leaders can truly bestride the world stage the way she does — it's a rare combination of charisma and competence.",
    past: "The warrior bestrode his horse and rode off into the storm without so much as a backward glance.",
    perfect: "She's bestridden the podium at every major international championship for the past five years running.",
  },
  bid: {
    base: "We always bid aggressively at these auctions because if you hesitate even for a second, someone else snaps it up.",
    past: "He bid a heartfelt farewell to his colleagues on his last day, and there wasn't a dry eye in the office.",
    perfect: "They've bid well above the asking price on three separate properties and still haven't managed to secure one.",
  },
  browbeat: {
    base: "Don't let anyone browbeat you into signing something you're not comfortable with — take your time and read every word.",
    past: "The manager browbeat the junior staff into working overtime without pay, and nobody dared to push back.",
    perfect: "She's been browbeaten into silence for so long that most people have forgotten she used to be the loudest voice in the room.",
  },
  bust: {
    base: "I swear this zip is going to bust if I try to force it closed — I think I overpacked again.",
    past: "He busted his ankle on the very first day of the skiing trip and spent the rest of the week in the lodge.",
    perfect: "The pipe has bust right in the middle of the hallway, and there's water absolutely everywhere.",
  },
  chide: {
    base: "Don't chide the kids for making a mess — they're just trying to help, even if it doesn't look like it.",
    past: "She chided him gently for forgetting their anniversary, but you could tell she wasn't really upset.",
    perfect: "He's been chided by the committee for his unprofessional conduct, and this time they've put it in writing.",
  },
  cleave: {
    base: "A sharp enough axe can cleave through a thick log in a single blow if you get the angle right.",
    past: "The ship's bow cleft through the icy water with a sound that echoed across the entire fjord.",
    perfect: "This issue has cloven the party in two, and I honestly don't see how they're going to unite before the election.",
  },
  countersink: {
    base: "Make sure you countersink those screws properly so they sit perfectly flush with the surface.",
    past: "He countersank every single bolt by hand, which took forever but the finished product looked incredible.",
    perfect: "She's countersunk all the fittings along the entire frame, and the craftsmanship is genuinely museum-quality.",
  },
  crossbreed: {
    base: "They crossbreed different varieties of apple trees on this farm to develop strains that can survive colder climates.",
    past: "The botanists crossbred two wild species and accidentally created something with the most amazing fragrance.",
    perfect: "The research lab has crossbred several strains over the past decade, and the results are finally starting to look promising.",
  },
  dare: {
    base: "I never dare question her decisions in front of the team — that's a conversation for behind closed doors.",
    past: "She dared to challenge the CEO directly in the all-hands meeting, and you could hear a pin drop in the room.",
    perfect: "He's dared to say what everyone else was thinking but nobody had the courage to bring up.",
  },
  disprove: {
    base: "A single well-designed experiment can disprove a theory that's been accepted for decades.",
    past: "She disproved the long-standing claim with just one elegant experiment that nobody could argue with.",
    perfect: "The latest study has disproven several assumptions that the entire field had been relying on for years.",
  },
  dive: {
    base: "Let's dive straight into the data and see if the numbers actually back up what everyone's been saying.",
    past: "He dove off the cliff into the crystal-clear water below without even checking how deep it was first.",
    perfect: "She's dived headfirst into the new role without any hesitation, and she's already making a real impact.",
  },
  forebear: {
    base: "I normally forebear from commenting on other people's parenting, because honestly it's none of my business.",
    past: "She forbore from saying what she really thought about the proposal, even though her expression said it all.",
    perfect: "He's foreborne from criticising the new management until now, but I think his patience is finally running out.",
  },
  foresee: {
    base: "Nobody could possibly foresee how quickly the entire industry would be turned upside down by this one piece of technology.",
    past: "She foresaw the supply chain issues months before anyone else, and she tried to warn them — but nobody listened.",
    perfect: "The risk assessment has foreseen several worst-case scenarios that we should probably start preparing for now.",
  },
  foretell: {
    base: "No one can foretell what the market's going to do next year — anyone who says otherwise is guessing.",
    past: "He foretold the company's downfall years before it actually happened, and everybody thought he was being dramatic.",
    perfect: "All the early indicators have foretold a dramatic shift in consumer behaviour that could reshape the whole industry.",
  },
  forgo: {
    base: "I'll forgo the starter and just have a main — I'm trying not to overdo it because we've got dessert coming.",
    past: "She forwent her entire annual leave to meet the project deadline, which I thought was incredibly dedicated.",
    perfect: "He's forgone sleep for three nights straight to get the report finished, and you can see it written all over his face.",
  },
  forsake: {
    base: "Don't forsake everything you've built just because things got difficult — this is exactly when you need to dig in.",
    past: "He forsook a promising career in finance to become a teacher, and he says it's the best decision he ever made.",
    perfect: "She's never once forsaken a friend in need, even when it meant putting her own problems on hold.",
  },
  gainsay: {
    base: "Nobody in the room can gainsay the data — it's right there in black and white for everyone to see.",
    past: "He gainsaid every single proposal that was put forward, yet never once offered a constructive alternative.",
    perfect: "The scientific evidence has been gainsaid by politicians with no expertise, and it's incredibly frustrating to watch.",
  },
  gild: {
    base: "Don't gild the lily — the original design is already beautiful, and adding more will just make it look busy.",
    past: "The master craftsman gilded the ornate frame with real gold leaf, and the whole piece came alive in the light.",
    perfect: "The restorer has gilded every surface in the chapel exactly as it was done three hundred years ago.",
  },
  hamstring: {
    base: "Budget cuts like these will absolutely hamstring the department's ability to deliver anything meaningful this year.",
    past: "Endless red tape hamstrung the team at every single stage, and what should've taken weeks ended up taking months.",
    perfect: "The entire initiative has been hamstrung by indecision at the top — nobody wants to take responsibility for a clear call.",
  },
  hew: {
    base: "The sculptor will hew the figure from a single block of marble, which is going to take the better part of a year.",
    past: "He hewed the timber by hand using tools that his great-grandfather had passed down through the family.",
    perfect: "She's hewn a truly remarkable career out of almost nothing, and her story is genuinely inspiring.",
  },
  inlay: {
    base: "The jeweller will inlay the design with mother-of-pearl, which gives it this gorgeous iridescent shimmer in the light.",
    past: "He inlaid the tabletop with an intricate geometric pattern that took over six months to complete.",
    perfect: "The craftsman has inlaid over two thousand individual pieces by hand — the level of detail is absolutely mind-blowing.",
  },
  input: {
    base: "Just input your details into the form and hit submit — the system will take care of the rest automatically.",
    past: "She input all the figures manually because the automatic upload kept crashing, which took her the entire afternoon.",
    perfect: "He's input the same dataset three times now because the server keeps timing out before the upload finishes.",
  },
  interbreed: {
    base: "These two closely related species can interbreed under certain conditions, which makes classification a real headache.",
    past: "The two isolated populations interbred over centuries once the land bridge reconnected them.",
    perfect: "The strains have interbred so extensively over the years that they're now virtually indistinguishable from one another.",
  },
  interweave: {
    base: "Great directors interweave multiple storylines in a way that feels completely seamless and never confusing.",
    past: "She interwove three entirely separate narrative threads so beautifully that the transitions felt completely effortless.",
    perfect: "The themes of love and loss have been interwoven throughout the novel from the very first page.",
  },
  miscast: {
    base: "Even the best directors sometimes miscast a role, and it can drag the entire production down with it.",
    past: "The studio miscast the lead in that film, and the mismatch between actor and character was painfully obvious.",
    perfect: "They've miscast several key roles this season, and the reviews have been absolutely brutal as a result.",
  },
  misdeal: {
    base: "If you misdeal, you've got to shuffle the whole deck again — there's no just carrying on from where you left off.",
    past: "He misdealt on the very first hand, and everyone groaned because we'd only just sat down to play.",
    perfect: "She's misdealt twice in the same game already, and at this point I think she's doing it on purpose to wind us up.",
  },
  misgive: {
    base: "Something about this whole arrangement misgives me — I can't put my finger on it, but it doesn't feel right.",
    past: "His heart misgave him as he read through the terms of the contract, and he very nearly walked away from the deal.",
    perfect: "Her instincts have misgiven her on every major decision this year, and every single time she was right to be cautious.",
  },
  mishear: {
    base: "I constantly mishear people in noisy restaurants and end up nodding along to things I haven't actually understood.",
    past: "She misheard the address and ended up on the completely wrong side of town, twenty minutes late and soaking wet.",
    perfect: "He's misheard the instructions again and done the whole thing backwards — we're going to have to start over.",
  },
  mislay: {
    base: "I mislay my reading glasses at least three times a day — they could honestly be anywhere in this house.",
    past: "She mislaid the only copy of the key and had to call a locksmith at eleven o'clock at night.",
    perfect: "He's mislaid the signed contract somewhere in his office, and now we're all tearing the place apart looking for it.",
  },
  mislead: {
    base: "Headlines like that deliberately mislead readers into thinking the situation is far worse than it actually is.",
    past: "She was completely misled by outdated information on the website, which caused her to miss the actual deadline.",
    perfect: "The public has been systematically misled about the true cost of this project for years, and people are furious.",
  },
  misread: {
    base: "I constantly misread people's tone in text messages and end up overthinking things that were meant to be lighthearted.",
    past: "He misread the map and took a wrong turn that added a solid two hours to what should've been a simple drive.",
    perfect: "She's completely misread the situation from start to finish, and now she's wondering why everyone's upset.",
  },
  misspell: {
    base: "I misspell \"necessary\" and \"accommodate\" literally every single time, no matter how many times I look them up.",
    past: "He misspelled the client's name on the contract, which was embarrassing enough, but then he did it again in the follow-up email.",
    perfect: "She's misspelled the same word five times in a row now, and at this point I'm starting to think she's messing with me.",
  },
  misspend: {
    base: "Don't misspend your twenties worrying about things that won't matter even slightly in ten years' time.",
    past: "He misspent years chasing opportunities that were never going to pan out, and it took a while to find his real path.",
    perfect: "The council has misspent a huge portion of the budget on consultants who haven't delivered a single actionable recommendation.",
  },
  misunderstand: {
    base: "People so often misunderstand what she's trying to say because she's got this really dry sense of humour.",
    past: "She completely misunderstood what he meant by that comment, and it caused a huge argument that lasted all weekend.",
    perfect: "He's been thoroughly misunderstood by the press — what he actually said was nothing like what the headlines suggest.",
  },
  offset: {
    base: "The savings on materials should offset the higher labour costs, so the total budget shouldn't change much.",
    past: "The strong performance in Q4 offset the losses from earlier in the year, and we ended up breaking even.",
    perfect: "The efficiency gains have more than offset the initial investment, so the project is already paying for itself.",
  },
  outbid: {
    base: "We always outbid at the last possible second — it's a risky strategy but it keeps the price down until the very end.",
    past: "She outbid everyone else at the auction with a final offer that nobody in the room could match.",
    perfect: "They've outbid every single competitor for the contract, and at this point it's hard to see who could stop them.",
  },
  outdo: {
    base: "She somehow manages to outdo herself with every single project — each one is better than the last.",
    past: "He completely outdid himself with that speech — half the room was in tears and the other half was on their feet.",
    perfect: "This year's event has outdone everything that came before it, and the bar was already ridiculously high.",
  },
  outgrow: {
    base: "Toddlers outgrow their shoes every couple of months, which is an absolute nightmare for your bank account.",
    past: "She outgrew the role within about a year and needed something that would actually challenge her.",
    perfect: "The company has completely outgrown its current office space, and we're literally running out of desks.",
  },
  outrun: {
    base: "You can't outrun your past forever — eventually it catches up with you, whether you're ready or not.",
    past: "He outran every single competitor in his age group by such a wide margin that people thought the timer was broken.",
    perfect: "Consumer demand has far outrun the available supply, and we're struggling to keep up with the backlog.",
  },
  outsell: {
    base: "Their flagship products consistently outsell everything else on the market by a pretty significant margin.",
    past: "She outsold every other agent in the entire region for three years straight, which was absolutely unheard of.",
    perfect: "The sequel has outsold the original within the first month, and pre-orders for the third one are already through the roof.",
  },
  outshine: {
    base: "Her work consistently outshines everyone else's on the team, and it's not even close most of the time.",
    past: "His performance completely outshone everything else at the festival — the crowd gave him a five-minute standing ovation.",
    perfect: "She's outshone every single rival at every stage of the competition, and the final round isn't even close.",
  },
  outwit: {
    base: "In this game, you outwit your opponents through strategy rather than brute force, which is what makes it so addictive.",
    past: "She outwitted the scammer with one clever phone call that caught them completely off guard.",
    perfect: "He's outwitted every obstacle the system has thrown at him, and I'm honestly starting to think he's unbeatable.",
  },
  overbear: {
    base: "Don't overbear the junior staff with your opinions — give them space to develop their own ideas first.",
    past: "His forceful personality overbore any resistance in the room, and nobody felt brave enough to push back.",
    perfect: "She's been overborne by circumstances beyond her control, and it's not fair to blame her for the outcome.",
  },
  overcast: {
    base: "Heavy clouds overcast the valley most mornings in November, and the sun rarely breaks through before midday.",
    past: "A thick grey haze overcast the entire sky by mid-afternoon, and the temperature dropped almost instantly.",
    perfect: "The horizon has been completely overcast since dawn, and it doesn't look like it's going to clear up anytime soon.",
  },
  overdo: {
    base: "Don't overdo it at the gym on your first day back — trust me, your body will thank you in the morning.",
    past: "She overdid the chilli in the curry, and the rest of us spent the evening gulping down glasses of milk.",
    perfect: "He's seriously overdone it this week — he's been working sixteen-hour days and he looks absolutely shattered.",
  },
  overdraw: {
    base: "I always overdraw my account right before payday because I'm terrible at keeping track of my spending.",
    past: "She overdrew her account by fifty quid and got slapped with a thirty-pound fee on top of it.",
    perfect: "He's overdrawn his account for the second time this month, and the bank has sent yet another strongly worded letter.",
  },
  overeat: {
    base: "I always overeat at buffets because my brain tells me I need to get my money's worth, even when my stomach disagrees.",
    past: "She overate at the Christmas party and spent the rest of the evening on the sofa regretting every single mince pie.",
    perfect: "I've overeaten so badly at this dinner that I genuinely don't think I can stand up.",
  },
  overhang: {
    base: "Those massive branches overhang the road so badly that lorries have to swerve around them every time they pass.",
    past: "The rock overhung the narrow path at such a sharp angle that we all had to duck just to get through.",
    perfect: "An enormous debt has overhung the company for years, and it's finally catching up with them.",
  },
  overhear: {
    base: "Be careful what you say in the office kitchen — you'd be amazed how many people might overhear.",
    past: "She overheard them talking about the redundancies in the corridor, a full week before the official announcement.",
    perfect: "I've overheard some absolutely wild conversations in this office that would make your head spin.",
  },
  overlay: {
    base: "You can overlay the satellite map with real-time traffic data, which is incredibly useful for planning delivery routes.",
    past: "They overlaid the original recording with a full orchestral arrangement, and the result was genuinely stunning.",
    perfect: "The new design has been carefully overlaid on the original blueprint without altering any of the structural elements.",
  },
  overlie: {
    base: "Thick layers of sediment can overlie incredibly valuable mineral deposits that are worth millions if you dig deep enough.",
    past: "A heavy layer of volcanic ash overlay the ancient city for centuries before archaeologists uncovered it.",
    perfect: "The newer geological strata have overlain the original surface so completely that the older formations are nearly impossible to access.",
  },
  overpay: {
    base: "Don't overpay for a trendy postcode when you can get twice the space ten minutes down the road.",
    past: "We overpaid for that flat by at least twenty grand, and we didn't realize it until the market dropped.",
    perfect: "The company has overpaid its top executives for years while complaining about budget constraints everywhere else.",
  },
  override: {
    base: "Common sense should override rigid protocol in situations where people's safety is genuinely at risk.",
    past: "The regional manager overrode the head office's decision at the last minute, which caused absolute chaos.",
    perfect: "The appeals court has overridden the original ruling, which means the whole case is essentially starting from scratch.",
  },
  overrun: {
    base: "Every single meeting will overrun if we don't stick to the agenda and stop going off on tangents.",
    past: "The renovation overran by three months and cost nearly double the original estimate — a classic nightmare.",
    perfect: "The project budget has overrun by thirty percent already, and we're not even halfway through the build.",
  },
  oversee: {
    base: "She'll oversee the entire rollout from start to finish, which should keep everything running smoothly.",
    past: "He oversaw every single phase of the project, from the initial planning right through to the final delivery.",
    perfect: "She's overseen dozens of successful product launches in her career, so we're in very safe hands.",
  },
  overshoot: {
    base: "It's incredibly easy to overshoot your budget on a project like this if you're not keeping a close eye on the numbers.",
    past: "The spacecraft overshot its intended landing zone by several kilometres due to a minor calculation error.",
    perfect: "Departmental spending has already overshot the annual budget, and we've still got two months to go.",
  },
  oversleep: {
    base: "I somehow oversleep every single time I have an early flight — it's like my subconscious is sabotaging me.",
    past: "He overslept by a solid two hours and missed the entire morning session of the conference.",
    perfect: "She's overslept and missed her job interview — I don't even know what to say to make her feel better.",
  },
  overthrow: {
    base: "Revolutions that overthrow established systems often create just as many problems as they solve.",
    past: "The military overthrew the government in a swift coup that took the international community completely by surprise.",
    perfect: "The regime has been overthrown after decades in power, and the streets are filled with people celebrating.",
  },
  partake: {
    base: "Everyone's welcome to partake in the festivities — there's more than enough food and drink to go around.",
    past: "She partook of the local wine with such enthusiasm that the vineyard owner gave her an extra bottle to take home.",
    perfect: "He's partaken in every single team social event since he joined, which says a lot about his character.",
  },
  preset: {
    base: "You can preset the thermostat to kick in half an hour before you get home, so the house is already warm when you arrive.",
    past: "She preset the oven timer before leaving the house so dinner would be ready the moment she walked back in.",
    perfect: "All the radio stations have been preset to her favourites, so she doesn't have to fiddle with the dial every time she gets in the car.",
  },
  proofread: {
    base: "Always proofread your emails before you hit send — you'd be surprised how many typos sneak through.",
    past: "He proofread the entire eighty-page report three times before handing it in, and he still found mistakes on the third pass.",
    perfect: "She's proofread every single chapter at least twice, and she's still convinced there's a typo hiding somewhere.",
  },
  rebuild: {
    base: "We rebuild the test environment from scratch every week to make sure nothing weird carries over between deployments.",
    past: "They rebuilt the whole neighbourhood from the ground up after the fire, and it's barely recognisable now.",
    perfect: "The team has rebuilt its reputation remarkably quickly considering how badly things went last year.",
  },
  redo: {
    base: "I always redo my work at least once before submitting it, because the first draft is never as good as I think it is.",
    past: "She redid the entire presentation from scratch overnight because the client changed the brief at the last minute.",
    perfect: "He's redone every single slide in the deck, and honestly it looks a hundred times better than the original.",
  },
  relay: {
    base: "They'll relay the bathroom tiles next week once the waterproofing underneath has had time to set properly.",
    past: "Workers relaid all the cables underground so the pavement could finally be resurfaced after months of roadworks.",
    perfect: "The team has relaid the entire kitchen floor, and the difference is absolutely night and day.",
  },
  remake: {
    base: "Studios constantly remake classic films, and honestly most of the time the original was better.",
    past: "They completely remade the website in under two weeks, which was impressive but also slightly terrifying.",
    perfect: "She's completely remade herself over the past year — new career, new city, new outlook on everything.",
  },
  rend: {
    base: "A sound like that can rend the silence so violently that your heart practically stops for a second.",
    past: "The explosion rent the air with such force that windows shattered three blocks away.",
    perfect: "The scandal has rent the community apart, and I doubt things will ever quite go back to how they were.",
  },
  repay: {
    base: "I'll repay you the second I get paid — I haven't forgotten, and I really appreciate you covering me.",
    past: "She repaid the entire loan a full year ahead of schedule, which saved her a fortune in interest.",
    perfect: "He's repaid every single debt he's ever owed, and he's incredibly proud of that — as he should be.",
  },
  rerun: {
    base: "They rerun the same classic sitcoms every Christmas, and honestly I still watch them every single time.",
    past: "The channel reran the whole series over the holidays, and the viewing figures were almost as high as the original broadcast.",
    perfect: "The experiment has been rerun three separate times with identical results, so the findings look pretty solid.",
  },
  resell: {
    base: "People resell those limited-edition trainers for three times the retail price the moment they sell out online.",
    past: "He resold the concert tickets at double the price, which I thought was pretty sneaky of him.",
    perfect: "She's resold every vintage piece she's ever bought at auction, and she's made a serious profit doing it.",
  },
  reset: {
    base: "Just reset the router and give it a minute — that fixes the internet about ninety percent of the time.",
    past: "She reset her password for the fourth time this month because she keeps forgetting the new one.",
    perfect: "The system has been fully reset and should be running smoothly now — fingers crossed it stays that way.",
  },
  retake: {
    base: "Students who fail the module retake the exam in September, which gives them the whole summer to revise properly.",
    past: "He retook the driving test after failing three times, and he finally passed — the relief on his face was priceless.",
    perfect: "She's retaken the photo about thirty times trying to get the lighting right, and she's still not happy with it.",
  },
  retell: {
    base: "My dad always retells the same three stories at every family gathering, and everyone pretends they haven't heard them before.",
    past: "She retold the ancient myth in a completely modern setting, and it worked surprisingly well.",
    perfect: "That story has been retold in so many different forms over the centuries that nobody knows what the original version actually was.",
  },
  rewind: {
    base: "Rewind that bit — I missed what she said because someone was talking over the telly.",
    past: "He rewound the tape and watched the same scene four times, trying to catch a detail he was sure he'd missed.",
    perfect: "She's rewound that one conversation in her head a hundred times, wishing she'd said something different.",
  },
  rewrite: {
    base: "I completely rewrite my first drafts every single time because I can never resist tinkering with every sentence.",
    past: "She rewrote the ending three separate times before she was finally satisfied with how the story wrapped up.",
    perfect: "He's rewritten the entire script from scratch, and honestly the new version is on a completely different level.",
  },
  slay: {
    base: "She absolutely slays every time she steps on stage — the audience goes wild before she even opens her mouth.",
    past: "He slew the competition in the final round with a performance that left the judges speechless.",
    perfect: "She's slain every single challenge that's been put in front of her this season, and the final is still to come.",
  },
  smite: {
    base: "In the story, the hero must smite the dragon before it destroys the kingdom — classic stuff, really.",
    past: "The knight smote the beast with a single blow of his enchanted sword, and the crowd erupted in cheers.",
    perfect: "Cupid has smitten him hard — he can't stop talking about her and he's been walking around with this ridiculous grin all week.",
  },
  "spoon-feed": {
    base: "You can't spoon-feed people their whole careers — at some point they need to figure things out for themselves.",
    past: "The professor spoon-fed the students every single answer, and then acted surprised when they couldn't think independently on the exam.",
    perfect: "He's been spoon-fed information his entire career, and now that he's on his own he doesn't know where to start.",
  },
  strew: {
    base: "The children always strew their toys all over the living room floor, and I'm constantly stepping on something.",
    past: "Autumn leaves strewed the garden path so thickly that you couldn't even see the paving stones underneath.",
    perfect: "Papers have been strewn all over the office floor — it looks like someone tipped a filing cabinet over.",
  },
  sunburn: {
    base: "I sunburn ridiculously easily — twenty minutes without suncream and I look like a lobster.",
    past: "She sunburned so badly on the first day of the holiday that she had to stay in the shade for the rest of the week.",
    perfect: "He's sunburned his shoulders again despite putting on factor fifty, which defies all known laws of physics.",
  },
  troubleshoot: {
    base: "I troubleshoot network issues all day long, and half the time the solution is just turning something off and on again.",
    past: "She troubleshot the entire server crash in under ten minutes while the rest of us were still figuring out what had happened.",
    perfect: "The engineer has troubleshot every possible cause and still can't figure out why the system keeps going down.",
  },
  typewrite: {
    base: "Very few people typewrite anything anymore — even my grandmother switched to a laptop about ten years ago.",
    past: "She typewrote the entire manuscript on a vintage typewriter, which gave it this beautiful old-fashioned character.",
    perfect: "He's typewritten every single letter he's ever sent, and his office is full of these gorgeous antique machines.",
  },
  unbind: {
    base: "Help me unbind these documents — whoever filed them used about fifteen rubber bands and I can't get them off.",
    past: "She carefully unbound the ancient manuscript, handling each page as if it might crumble at any moment.",
    perfect: "He's mentally unbound himself from every obligation that was holding him back, and he seems like a completely different person.",
  },
  undergo: {
    base: "All new hires undergo a three-week training programme before they're allowed anywhere near an actual client.",
    past: "She underwent major surgery last spring and was back at work within six weeks, which honestly amazed everyone.",
    perfect: "The city centre has undergone such a dramatic transformation over the past decade that I barely recognise it anymore.",
  },
  underlie: {
    base: "Deep-rooted insecurities often underlie what looks like anger or aggression on the surface.",
    past: "A fundamental disagreement about values underlay the entire dispute, even though nobody wanted to admit it at the time.",
    perfect: "These core principles have underlain the organisation's approach since the very beginning, and they're not about to change now.",
  },
  undermine: {
    base: "Constant micromanagement will undermine even the most motivated employee's confidence and make them question everything.",
    past: "His careless comments completely undermined everything the team had been working towards for the past six months.",
    perfect: "Public trust has been severely undermined by a series of broken promises, and it's going to take a long time to rebuild.",
  },
  underpay: {
    base: "Too many companies shamelessly underpay their staff and then act surprised when everyone leaves for a better offer.",
    past: "The firm systematically underpaid its workers for years and only got caught when a whistleblower went to the press.",
    perfect: "She's been underpaid for the level of work she does for her entire career, and she's finally starting to push back.",
  },
  undersell: {
    base: "Don't undersell yourself in the interview — if you don't talk about your achievements, nobody else is going to do it for you.",
    past: "He undersold the product so dramatically during the pitch that the client didn't even realise what they were getting.",
    perfect: "She's consistently undersold her own abilities for years, and it's only now that people are realising how good she actually is.",
  },
  undertake: {
    base: "We undertake a full security audit every quarter to make sure nothing's slipped through the cracks.",
    past: "She undertook the entire renovation with barely any help, which was incredibly ambitious but she pulled it off beautifully.",
    perfect: "He's undertaken every single challenge thrown at him with total commitment, and that's why people trust him with the big projects.",
  },
  underwrite: {
    base: "Major banks typically underwrite deals of this size, and they do a thorough risk assessment before committing a single penny.",
    past: "They underwrote the insurance policy without a moment's hesitation once they saw the company's track record.",
    perfect: "The foundation has underwritten the research programme for three consecutive years, and the results have been extraordinary.",
  },
  undo: {
    base: "You can't undo the damage once it's been done — that's why it's so important to think before you speak.",
    past: "One careless email undid months of careful relationship-building with the client in the space of about thirty seconds.",
    perfect: "Six months of hard work have been completely undone by one bad week of decisions, and the team is devastated.",
  },
  unfreeze: {
    base: "We should unfreeze the budget for marketing now that the new product launch has been confirmed.",
    past: "The bank finally unfroze the account after the investigation cleared up, which was a massive relief for everyone involved.",
    perfect: "The company's assets have been unfrozen following the court order, so operations can finally resume as normal.",
  },
  unwind: {
    base: "I usually unwind after a long day by putting on a podcast and going for a walk around the neighbourhood.",
    past: "She unwound with a long bath, a glass of wine, and a book — the perfect Friday evening, if you ask me.",
    perfect: "He's finally unwound after months of relentless pressure at work, and it's genuinely lovely to see him smiling again.",
  },
  uphold: {
    base: "We should always uphold the standards we've set, even when it's inconvenient or nobody's watching.",
    past: "The judge upheld the original verdict despite enormous public pressure to overturn it.",
    perfect: "The supreme court has upheld the constitutional right in a landmark decision that's going to affect everyone.",
  },
  upset: {
    base: "Sudden changes in routine always upset the kids, so we try to give them as much notice as possible.",
    past: "His late arrival upset the entire schedule, and we spent the rest of the day trying to catch up.",
    perfect: "The unexpected result has upset everyone's predictions and thrown the whole tournament wide open.",
  },
  waylay: {
    base: "Don't let minor distractions waylay you from your main goal — keep your eyes on the bigger picture.",
    past: "He was waylaid by a group of eager journalists the moment he stepped out of the building.",
    perfect: "She's been waylaid by one crisis after another all morning, and she still hasn't managed to sit down at her desk.",
  },
  withhold: {
    base: "You should never withhold critical information from your team, even if you think it might cause panic.",
    past: "He deliberately withheld the test results until the very last moment, which caused unnecessary anxiety for everyone.",
    perfect: "Key evidence has been withheld from the investigation, and the defence is demanding a full inquiry into why.",
  },
  withstand: {
    base: "This building can withstand earthquake tremors of up to magnitude seven, which is reassuring given where we are.",
    past: "She withstood an unbelievable amount of pressure during the trial and never once lost her composure.",
    perfect: "The old stone bridge has withstood centuries of harsh weather and still looks like it could stand for another hundred years.",
  },
};

const STORAGE_KEY = "irregular-verbs-progress-stable-v1";
const APP_META_KEY = "irregular-verbs-app-meta-stable-v1";
const SETTINGS_KEY = "irregular-verbs-settings-stable-v1";

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, "/");
}

function primaryVariant(value) {
  return String(value || "").split("/")[0];
}

function isCorrect(answer, target) {
  const variants = String(target)
    .split("/")
    .map((item) => normalize(item))
    .filter(Boolean);
  const answers = normalize(answer)
    .split("/")
    .map((a) => a.trim())
    .filter(Boolean);
  return answers.length > 0 && answers.every((a) => variants.includes(a));
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function previousDateKey(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  date.setDate(date.getDate() - 1);
  return localDateKey(date);
}

function speakText(text, speed = 0.95) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = speed;
  window.speechSynthesis.speak(utterance);
}

function speakVerb(verb, speed = 0.95) {
  if (!verb) return;
  speakText(primaryVariant(verb.base), speed);
}

function speakAllForms(verb, speed = 0.95) {
  if (!verb) return;
  speakText(`${primaryVariant(verb.base)}. ${primaryVariant(verb.past)}. ${primaryVariant(verb.pp)}`, speed);
}

function getDefaultProgressRecord() {
  return { starred: false, known: false, mistaken: false, right: 0, wrong: 0, reviews: 0, lastSeen: null };
}

function getDifficulty(record) {
  const wrong = record?.wrong || 0;
  const right = record?.right || 0;
  if (wrong >= 4 || wrong > right) return "hard";
  if (right >= 3 && wrong === 0) return "easy";
  return "normal";
}

function getVerbExamples(verb) {
  const ex = VERB_EXAMPLES[verb?.base];
  if (ex) return ex;
  const base = primaryVariant(verb?.base || "");
  const past = primaryVariant(verb?.past || "");
  const pp = primaryVariant(verb?.pp || "");
  return {
    base: `I need to ${base} this.`,
    past: `Yesterday, I ${past}.`,
    perfect: `I have ${pp} this before.`,
  };
}

function buildTenseExamples(verb) {
  const ex = getVerbExamples(verb);
  return [
    ["Infinitive", ex.base],
    ["Past Simple", ex.past],
    ["Present Perfect", ex.perfect],
  ];
}

function buildChoiceQuestion(verb, pool) {
  const types = [
    { key: "past", title: "Выбери Past Simple" },
    { key: "pp", title: "Выбери Past Participle" },
    { key: "pair", title: "Выбери обе формы" },
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const correct =
    type.key === "past"
      ? primaryVariant(verb.past)
      : type.key === "pp"
        ? primaryVariant(verb.pp)
        : `${primaryVariant(verb.past)} · ${primaryVariant(verb.pp)}`;

  const distractors = shuffle(
    pool
      .filter((item) => item.base !== verb.base)
      .map((item) =>
        type.key === "past"
          ? primaryVariant(item.past)
          : type.key === "pp"
            ? primaryVariant(item.pp)
            : `${primaryVariant(item.past)} · ${primaryVariant(item.pp)}`
      )
      .filter((item, index, arr) => item !== correct && arr.indexOf(item) === index)
  ).slice(0, 3);

  return {
    type: type.key,
    title: type.title,
    correct,
    options: shuffle([correct, ...distractors]),
    verbBase: verb.base,
  };
}

function buildTranslateQuestion(verb, pool) {
  const direction = Math.random() < 0.5 ? "en-ru" : "ru-en";
  if (direction === "en-ru") {
    const correct = verb.ru;
    const distractors = shuffle(
      pool
        .filter((v) => v.base !== verb.base && v.ru !== verb.ru)
        .map((v) => v.ru)
        .filter((v, i, arr) => arr.indexOf(v) === i)
    ).slice(0, 3);
    return { direction, word: verb.base, correct, options: shuffle([correct, ...distractors]), verbBase: verb.base };
  }
  const correct = verb.base;
  const distractors = shuffle(
    pool
      .filter((v) => v.base !== verb.base)
      .map((v) => v.base)
      .filter((v, i, arr) => arr.indexOf(v) === i)
  ).slice(0, 3);
  return { direction, word: verb.ru, correct, options: shuffle([correct, ...distractors]), verbBase: verb.base };
}

function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-zinc-100 text-zinc-600",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    dark: "bg-teal-700 text-white",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function StatCard({ icon: Icon, label, value, hint, onClick, active }) {
  return (
    <button onClick={onClick} className={`min-w-0 rounded-2xl bg-white p-3 shadow-sm ring-1 text-left transition sm:p-4 ${active ? "ring-teal-400 ring-2" : "ring-zinc-100 hover:ring-zinc-200"}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="shrink-0 rounded-xl bg-teal-50 p-2">
          <Icon className="h-4 w-4 text-teal-700 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs text-zinc-400 sm:text-sm">{label}</div>
          <div className="truncate text-lg font-semibold leading-tight text-zinc-900 sm:text-2xl">{value}</div>
          {hint ? <div className="mt-0.5 truncate text-[11px] text-zinc-400 sm:text-xs">{hint}</div> : null}
        </div>
      </div>
    </button>
  );
}

function BottomTab({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-medium transition ${
        active ? "bg-teal-700 text-white" : "text-zinc-400 hover:text-zinc-600"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition ${
        active ? "bg-teal-700 text-white" : "bg-white text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function IrregularVerbsTrainer() {
  const todayKey = localDateKey();
  const fileInputRef = useRef(null);

  const [tab, setTab] = useState("words");
  const [learnMode, setLearnMode] = useState("cards");
  const [search, setSearch] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [learnFilter, setLearnFilter] = useState("all");
  const [quizFilter, setQuizFilter] = useState("hard");
  const [quizMode, setQuizMode] = useState("input");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState({});
  const [appMeta, setAppMeta] = useState({ streak: 0, lastStudyDate: null, dailyActivity: {} });
  const [settings, setSettings] = useState({ dailyGoal: 20, speechRate: 0.95, autoplayAudio: false, exampleMode: "short" });
  const [quizVerbBase, setQuizVerbBase] = useState(null);
  const [answerPast, setAnswerPast] = useState("");
  const [answerPP, setAnswerPP] = useState("");
  const [choiceSelected, setChoiceSelected] = useState("");
  const [choiceQuestion, setChoiceQuestion] = useState({ type: "pair", title: "Выбери обе формы", correct: "", options: [], verbBase: "" });
  const [translateQuestion, setTranslateQuestion] = useState({ direction: "en-ru", word: "", correct: "", options: [], verbBase: "" });
  const [translateSelected, setTranslateSelected] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [openStat, setOpenStat] = useState(null);
  const [mistakesMode, setMistakesMode] = useState("list");
  const [session, setSession] = useState({ correct: 0, total: 0 });
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setProgress(safeParse(window.localStorage.getItem(STORAGE_KEY), {}));
    setAppMeta(safeParse(window.localStorage.getItem(APP_META_KEY), { streak: 0, lastStudyDate: null, dailyActivity: {} }));
    setSettings(safeParse(window.localStorage.getItem(SETTINGS_KEY), { dailyGoal: 20, speechRate: 0.95, autoplayAudio: false, exampleMode: "short" }));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(APP_META_KEY, JSON.stringify(appMeta));
  }, [appMeta]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);


  useEffect(() => {
    if (!toast || typeof window === "undefined") return undefined;
    const id = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (settings.autoplayAudio) {
      const verbs = currentVerbRef.current;
      if (verbs) speakVerb(verbs, settings.speechRate);
    }
  }, [selectedIndex]);

  const currentVerbRef = useRef(null);

  function registerStudyActivity(points = 1) {
    setAppMeta((prev) => {
      const streak = prev.lastStudyDate === todayKey ? prev.streak : prev.lastStudyDate === previousDateKey(todayKey) ? prev.streak + 1 : 1;
      return {
        ...prev,
        streak,
        lastStudyDate: todayKey,
        dailyActivity: {
          ...(prev.dailyActivity || {}),
          [todayKey]: ((prev.dailyActivity || {})[todayKey] || 0) + points,
        },
      };
    });
  }

  const enrichedVerbs = useMemo(() => {
    return VERBS.map((verb) => {
      const record = progress[verb.base] || getDefaultProgressRecord();
      return { ...verb, progress: record, difficulty: getDifficulty(record), common: COMMON_VERBS.has(verb.base) };
    });
  }, [progress]);

  const filteredVerbs = useMemo(() => {
    let result = enrichedVerbs.filter((verb) => {
      const haystack = `${verb.base} ${verb.past} ${verb.pp} ${verb.ru}`.toLowerCase();
      const searchOk = haystack.includes(search.toLowerCase());
      if (!searchOk) return false;
      if (learnFilter === "starred") return verb.progress.starred;
      if (learnFilter === "mistakes") return verb.progress.mistaken;
      if (learnFilter === "unlearned") return !verb.progress.known;
      if (learnFilter === "hard") return verb.difficulty === "hard";
      if (["basic", "advanced", "rare"].includes(learnFilter)) return verb.level === learnFilter;
      if (learnFilter === "common") return verb.common;
      return true;
    });
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hasRussian = /[а-яё]/i.test(q);
      if (hasRussian) {
        const ruWords = result.map((v) => {
          const translations = v.ru.toLowerCase().split(/,\s*/);
          const exactMatch = translations.some((t) => t === q);
          const startMatch = translations.some((t) => t.startsWith(q));
          const score = exactMatch ? 2 : startMatch ? 1 : 0;
          return { v, score };
        });
        ruWords.sort((a, b) => b.score - a.score);
        result = ruWords.filter((r) => r.score > 0).length
          ? ruWords.filter((r) => r.score > 0).map((r) => r.v)
          : ruWords.slice(0, 3).map((r) => r.v);
      } else {
        const exact = result.find((v) => v.base === q || v.past === q || v.pp === q);
        result = exact ? [exact] : result.slice(0, 1);
      }
    }
    return result;
  }, [enrichedVerbs, search, learnFilter]);

  useEffect(() => {
    if (selectedIndex > filteredVerbs.length - 1) setSelectedIndex(0);
  }, [filteredVerbs.length, selectedIndex]);

  const currentVerb = filteredVerbs[selectedIndex] || enrichedVerbs[0] || null;
  currentVerbRef.current = currentVerb;

  const quizPool = useMemo(() => {
    const all = enrichedVerbs;
    const hard = all.filter((v) => v.difficulty === "hard");
    const unlearned = all.filter((v) => !v.progress.known);
    const starred = all.filter((v) => v.progress.starred);
    const mistakes = all.filter((v) => v.progress.mistaken);
    if (quizFilter === "hard") return hard.length ? hard : all;
    if (quizFilter === "unlearned") return unlearned.length ? unlearned : all;
    if (quizFilter === "starred") return starred.length ? starred : all;
    if (quizFilter === "mistakes") return mistakes.length ? mistakes : all;
    if (["basic", "advanced", "rare"].includes(quizFilter)) {
      const level = all.filter((v) => v.level === quizFilter);
      return level.length ? level : all;
    }
    if (quizFilter === "common") {
      const common = all.filter((v) => v.common);
      return common.length ? common : all;
    }
    return all;
  }, [enrichedVerbs, quizFilter]);

  const quizVerb = useMemo(() => {
    return quizPool.find((v) => v.base === quizVerbBase) || quizPool[0] || null;
  }, [quizPool, quizVerbBase]);

  useEffect(() => {
    if (!quizPool.length) return;
    if (!quizVerbBase || !quizPool.some((v) => v.base === quizVerbBase)) {
      setQuizVerbBase(quizPool[0].base);
    }
  }, [quizPool, quizVerbBase]);

  useEffect(() => {
    if (!quizVerb || quizMode !== "choice") return;
    setChoiceQuestion(buildChoiceQuestion(quizVerb, quizPool));
    setChoiceSelected("");
    setFeedback(null);
  }, [quizVerbBase, quizMode, quizFilter]);

  useEffect(() => {
    if (!quizVerb || quizMode !== "translate") return;
    setTranslateQuestion(buildTranslateQuestion(quizVerb, quizPool));
    setTranslateSelected("");
    setFeedback(null);
  }, [quizVerbBase, quizMode, quizFilter]);

  const stats = useMemo(() => {
    const items = enrichedVerbs.map((v) => v.progress);
    const mastered = items.filter((i) => i.known).length;
    const starred = items.filter((i) => i.starred).length;
    const reviews = items.reduce((sum, item) => sum + (item.reviews || 0), 0);
    const totalAnswers = items.reduce((sum, item) => sum + (item.right || 0) + (item.wrong || 0), 0);
    const totalRight = items.reduce((sum, item) => sum + (item.right || 0), 0);
    const hard = enrichedVerbs.filter((v) => v.difficulty === "hard").length;
    const mistakes = items.filter((i) => i.mistaken).length;
    return {
      mastered,
      starred,
      reviews,
      hard,
      mistakes,
      accuracy: totalAnswers ? Math.round((totalRight / totalAnswers) * 100) : 0,
    };
  }, [enrichedVerbs]);

  const todayDone = appMeta.dailyActivity?.[todayKey] || 0;
  const dailyGoalPercent = Math.min(100, Math.round((todayDone / settings.dailyGoal) * 100));
  const sessionAccuracy = session.total ? Math.round((session.correct / session.total) * 100) : 0;
  const masteredPercent = Math.round((stats.mastered / VERBS.length) * 100);

  function updateProgress(base, updater) {
    setProgress((prev) => {
      const current = prev[base] || getDefaultProgressRecord();
      return { ...prev, [base]: updater(current) };
    });
  }

  function toggleStar(verb) {
    updateProgress(verb.base, (current) => ({ ...current, starred: !current.starred }));
  }

  function markKnown(verb, known) {
    updateProgress(verb.base, (current) => ({
      ...current,
      known,
      reviews: (current.reviews || 0) + 1,
      lastSeen: todayKey,
    }));
    registerStudyActivity(1);
    setToast(known ? "Добавлено в выученные" : "Вернули в повторение");
  }

  function revealCard() {
    if (!currentVerb) return;
    if (!revealed) {
      updateProgress(currentVerb.base, (current) => ({
        ...current,
        reviews: (current.reviews || 0) + 1,
        lastSeen: todayKey,
      }));
      registerStudyActivity(1);
    }
    setRevealed((prev) => !prev);
  }

  function nextCard() {
    if (!filteredVerbs.length) return;
    setSelectedIndex((prev) => (prev + 1) % filteredVerbs.length);
    setRevealed(false);

  }

  function prevCard() {
    if (!filteredVerbs.length) return;
    setSelectedIndex((prev) => (prev - 1 + filteredVerbs.length) % filteredVerbs.length);
    setRevealed(false);

  }

  function applyQuizResult(verb, success) {
    registerStudyActivity(2);
    setSession((prev) => ({ correct: prev.correct + (success ? 1 : 0), total: prev.total + 1 }));
    updateProgress(verb.base, (current) => ({
      ...current,
      known: success ? true : current.known,
      mistaken: !success,
      right: (current.right || 0) + (success ? 1 : 0),
      wrong: (current.wrong || 0) + (success ? 0 : 1),
      reviews: (current.reviews || 0) + 1,
      lastSeen: todayKey,
    }));
  }

  function submitQuiz() {
    if (!quizVerb) return;
    if (quizMode === "translate") {
      if (!translateSelected) return;
      const success = translateSelected === translateQuestion.correct;
      setFeedback({ mode: "translate", success, selected: translateSelected, correct: translateQuestion.correct, direction: translateQuestion.direction });
      applyQuizResult(quizVerb, success);
      return;
    }
    if (quizMode === "choice") {
      if (!choiceSelected) return;
      const success = choiceSelected === choiceQuestion.correct;
      setFeedback({ mode: "choice", success, selected: choiceSelected, correct: choiceQuestion.correct });
      applyQuizResult(quizVerb, success);
      return;
    }
    const okPast = isCorrect(answerPast, quizVerb.past);
    const okPP = isCorrect(answerPP, quizVerb.pp);
    const success = okPast && okPP;
    setFeedback({ mode: "input", success, okPast, okPP, userPast: answerPast, userPP: answerPP });
    applyQuizResult(quizVerb, success);
  }

  function nextQuiz() {
    const pool = shuffle(quizPool);
    const next = pool.find((v) => v.base !== quizVerb?.base) || pool[0];
    setQuizVerbBase(next?.base || null);
    setAnswerPast("");
    setAnswerPP("");
    setChoiceSelected("");
    setTranslateSelected("");
    setFeedback(null);
  }

  function handleQuizKeyDown(event) {
    if (event.key !== "Enter") return;
    if (feedback) { nextQuiz(); return; }
    if (quizMode === "input") submitQuiz();
  }

  function exportProgress() {
    const payload = { version: 1, progress, appMeta, settings, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `irregular-verbs-progress-${todayKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast("Прогресс экспортирован");
  }

  function importProgress(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        setProgress(parsed.progress || {});
        setAppMeta(parsed.appMeta || { streak: 0, lastStudyDate: null, dailyActivity: {} });
        setSettings(parsed.settings || { dailyGoal: 20, speechRate: 0.95, autoplayAudio: false, exampleMode: "short" });
        setToast("Прогресс импортирован");
      } catch {
        setToast("Не удалось импортировать файл");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function resetAll() {
    setProgress({});
    setAppMeta({ streak: 0, lastStudyDate: null, dailyActivity: {} });
    setSession({ correct: 0, total: 0 });
    setFeedback(null);
    setAnswerPast("");
    setAnswerPP("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(APP_META_KEY);
      window.localStorage.removeItem(SETTINGS_KEY);
    }
    setToast("Прогресс сброшен");
  }

  async function shareApp() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;
    const shareData = {
      title: "Irregular Verbs Trainer",
      text: "Тренажёр неправильных глаголов",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Ссылка скопирована");
    } catch {
      setToast("Не удалось поделиться");
    }
  }

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col pb-24">
        <main className="flex-1 px-4 pt-5 pb-4">
          {tab === "learn" ? (
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-1">
                <FilterChip active={quizFilter === "hard"} onClick={() => setQuizFilter("hard")}>Сложные</FilterChip>
                <FilterChip active={quizFilter === "common"} onClick={() => setQuizFilter("common")}>Частые</FilterChip>
                <FilterChip active={quizFilter === "basic"} onClick={() => setQuizFilter("basic")}>Базовые</FilterChip>
                <FilterChip active={quizFilter === "advanced"} onClick={() => setQuizFilter("advanced")}>Продвинутые</FilterChip>
                <FilterChip active={quizFilter === "rare"} onClick={() => setQuizFilter("rare")}>Редкие</FilterChip>
                <FilterChip active={quizFilter === "all"} onClick={() => setQuizFilter("all")}>Все</FilterChip>
              </div>

              <div className="space-y-4">
                  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
                        <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-zinc-900">{quizVerb?.base}</h2>
                        {quizMode !== "translate" ? <div className="mt-1 text-zinc-500">{quizVerb?.ru}</div> : <div className="mt-1 text-sm text-teal-600">{translateQuestion.direction === "en-ru" ? "Подбери перевод" : "Подбери слово"}</div>}
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {quizVerb?.level ? <Badge>{LEVEL_LABELS[quizVerb.level]}</Badge> : null}
                          {quizVerb?.common ? <Badge tone="dark">частый</Badge> : null}
                        </div>
                      </div>
                      <button onClick={() => speakVerb(quizVerb, settings.speechRate)} className="rounded-xl bg-zinc-100 p-3 text-zinc-600 transition hover:bg-zinc-200"><Volume2 className="h-5 w-5" /></button>
                    </div>

                    <div className="mt-5">
                      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                        <FilterChip active={quizMode === "input"} onClick={() => { setQuizMode("input"); setFeedback(null); setChoiceSelected(""); setTranslateSelected(""); }}>Ввод</FilterChip>
                        <FilterChip active={quizMode === "choice"} onClick={() => { setQuizMode("choice"); setFeedback(null); setAnswerPast(""); setAnswerPP(""); setChoiceSelected(""); setTranslateSelected(""); }}>Выбор формы</FilterChip>
                        <FilterChip active={quizMode === "translate"} onClick={() => { setQuizMode("translate"); setFeedback(null); setAnswerPast(""); setAnswerPP(""); setChoiceSelected(""); setTranslateSelected(""); }}>Перевод</FilterChip>
                      </div>

                      {quizMode === "input" ? (
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Simple</label>
                            <input value={answerPast} onChange={(e) => setAnswerPast(e.target.value)} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Например: went" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-60" />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Participle</label>
                            <input value={answerPP} onChange={(e) => setAnswerPP(e.target.value)} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Например: gone" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-60" />
                          </div>
                        </div>
                      ) : quizMode === "choice" ? (
                        <div>
                          <div className="mb-1 text-sm font-medium text-zinc-700">{choiceQuestion.title}</div>
                          <div className="mb-3 text-xs text-zinc-400">Варианты похожи между собой, чтобы угадывать было сложнее.</div>
                          <div className="grid gap-3">
                            {choiceQuestion.options.map((option) => {
                              const isSelected = choiceSelected === option;
                              const showResult = Boolean(feedback);
                              const isCorrect = option === choiceQuestion.correct;
                              const isWrongSelected = showResult && isSelected && !isCorrect;
                              const optionClass = showResult
                                ? isCorrect
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                  : isWrongSelected
                                    ? "border-rose-400 bg-rose-50 text-rose-800"
                                    : "border-zinc-200 bg-white text-zinc-300"
                                : isSelected
                                  ? "border-teal-600 bg-teal-700 text-white"
                                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300";
                              return (
                                <button key={option} onClick={() => setChoiceSelected(option)} disabled={Boolean(feedback)} className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition ${optionClass}`}>{option}</button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-1 text-sm font-medium text-zinc-700">{translateQuestion.direction === "en-ru" ? "Выбери правильный перевод" : "Выбери английское слово"}</div>
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-2xl font-bold text-zinc-900">{translateQuestion.word}</span>
                            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">{translateQuestion.direction === "en-ru" ? "en → ru" : "ru → en"}</span>
                          </div>
                          <div className="grid gap-3">
                            {translateQuestion.options.map((option) => {
                              const isSelected = translateSelected === option;
                              const showResult = Boolean(feedback) && feedback.mode === "translate";
                              const isCorrectOption = option === translateQuestion.correct;
                              const isWrongSelected = showResult && isSelected && !isCorrectOption;
                              const optionClass = showResult
                                ? isCorrectOption
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                  : isWrongSelected
                                    ? "border-rose-400 bg-rose-50 text-rose-800"
                                    : "border-zinc-200 bg-white text-zinc-300"
                                : isSelected
                                  ? "border-teal-600 bg-teal-700 text-white"
                                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300";
                              return (
                                <button key={option} onClick={() => setTranslateSelected(option)} disabled={Boolean(feedback)} className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition ${optionClass}`}>{option}</button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {feedback ? (
                      <div className="mt-4">
                        <button type="button" onClick={nextQuiz} className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Следующий →</button>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={submitQuiz}
                          disabled={(quizMode === "choice" && (!choiceSelected || choiceQuestion.verbBase !== quizVerb?.base)) || (quizMode === "translate" && !translateSelected)}
                          className="w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-40"
                        >
                          Проверить
                        </button>
                      </div>
                    )}

                    {feedback ? (
                      <div className="mt-4 space-y-4">
                        <div className={`rounded-xl p-4 ${feedback.success ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-rose-50 ring-1 ring-rose-200"}`}>
                          <div className={`font-semibold ${feedback.success ? "text-emerald-800" : "text-rose-800"}`}>{feedback.success ? "Верно!" : "Есть ошибки"}</div>
                          <div className="mt-2 rounded-lg bg-white p-3 text-sm text-zinc-700">
                            <div className="font-medium text-zinc-500 text-xs uppercase tracking-wider">Правильные формы</div>
                            <div className="mt-1 text-base"><span className="font-semibold">{quizVerb?.base}</span> — <span className="font-semibold">{quizVerb?.past}</span> — <span className="font-semibold">{quizVerb?.pp}</span></div>
                            <button onClick={() => speakAllForms(quizVerb, settings.speechRate)} className="mt-2 flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-200"><Volume2 className="h-3.5 w-3.5" />Озвучить</button>
                          </div>
                          {feedback.mode === "input" ? (
                            <div className="mt-3 space-y-2">
                              <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPast ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                                <div>
                                  <span className="font-medium">Past Simple: </span>
                                  {feedback.okPast ? (
                                    <span>{feedback.userPast} ✓</span>
                                  ) : (
                                    <span><s className="text-rose-400">{feedback.userPast || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.past}</span></span>
                                  )}
                                </div>
                              </div>
                              <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPP ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                                <div>
                                  <span className="font-medium">Past Participle: </span>
                                  {feedback.okPP ? (
                                    <span>{feedback.userPP} ✓</span>
                                  ) : (
                                    <span><s className="text-rose-400">{feedback.userPP || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.pp}</span></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : feedback.mode === "translate" ? (
                            <div className="mt-2 text-sm text-slate-500">
                              {feedback.direction === "en-ru" ? `${quizVerb?.base} → ${quizVerb?.ru}` : `${quizVerb?.ru} → ${quizVerb?.base}`}
                              {!feedback.success ? <span> · Твой ответ: {feedback.selected}</span> : null}
                            </div>
                          ) : (
                            <div className="mt-2 text-sm text-slate-500">Твой выбор: {feedback.selected}</div>
                          )}
                        </div>

                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
                          <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">Примеры</div>
                          <div className="mt-2 grid gap-1.5">
                            {buildTenseExamples(quizVerb).map(([label, sentence]) => (
                              <div key={label} className="rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                                <span className="font-medium text-zinc-400">{label}:</span> {sentence}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button type="button" onClick={nextQuiz} className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Следующий →</button>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <StatCard icon={Brain} label="Вопросов" value={session.total} />
                    <StatCard icon={CheckCircle2} label="Верно" value={session.correct} />
                    <StatCard icon={Trophy} label="Точность" value={`${sessionAccuracy}%`} />
                  </div>
                </div>
            </div>
          ) : null}

          {tab === "words" ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по глаголу, форме или переводу"
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <FilterChip active={learnFilter === "all"} onClick={() => setLearnFilter("all")}>Все</FilterChip>
                  <FilterChip active={learnFilter === "common"} onClick={() => setLearnFilter("common")}>Частые</FilterChip>
                  <FilterChip active={learnFilter === "basic"} onClick={() => setLearnFilter("basic")}>Базовые</FilterChip>
                  <FilterChip active={learnFilter === "advanced"} onClick={() => setLearnFilter("advanced")}>Продвинутые</FilterChip>
                  <FilterChip active={learnFilter === "rare"} onClick={() => setLearnFilter("rare")}>Редкие</FilterChip>
                  <FilterChip active={learnFilter === "hard"} onClick={() => setLearnFilter("hard")}>Сложные</FilterChip>
                  <FilterChip active={learnFilter === "starred"} onClick={() => setLearnFilter("starred")}>Избранное</FilterChip>
                  <FilterChip active={learnFilter === "mistakes"} onClick={() => setLearnFilter("mistakes")}>Ошибки</FilterChip>
                  <FilterChip active={learnFilter === "unlearned"} onClick={() => setLearnFilter("unlearned")}>Не выученные</FilterChip>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-zinc-900">Словарь</h1>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">{filteredVerbs.length} слов</span>
              </div>

              {filteredVerbs.length ? (
                <div className="space-y-3">
                  {filteredVerbs.map((verb) => (
                    <div key={verb.base} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <div className="text-2xl font-semibold text-zinc-900">{verb.base}</div>
                            <span className="text-sm text-zinc-400">/{verb.tr}/</span>
                          </div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span className="text-sm text-zinc-500">{verb.ru}</span>
                            <Badge>{LEVEL_LABELS[verb.level]}</Badge>
                            {verb.common ? <Badge tone="dark">частый</Badge> : null}
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-1.5">
                          <button onClick={() => toggleStar(verb)} className={`rounded-lg p-2 transition ${verb.progress.starred ? "bg-amber-50 text-amber-500" : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"}`} title="В избранное"><Star className={`h-4 w-4 ${verb.progress.starred ? "fill-amber-400" : ""}`} /></button>
                          <button onClick={() => speakVerb(verb, settings.speechRate)} className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition hover:bg-zinc-200" title="Озвучить слово"><Volume2 className="h-4 w-4" /></button>
                          <button onClick={() => speakAllForms(verb, settings.speechRate)} className="rounded-lg bg-zinc-100 px-2.5 py-2 text-xs font-medium text-zinc-500 transition hover:bg-zinc-200">Все</button>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-px overflow-hidden rounded-xl bg-zinc-100 md:grid-cols-3">
                        <div className="bg-white p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
                              <div className="text-base font-semibold text-zinc-900">{verb.base} <span className="text-xs font-normal text-zinc-400">/{verb.tr}/</span></div>
                            </div>
                            <button onClick={() => speakText(primaryVariant(verb.base), settings.speechRate)} className="shrink-0 rounded-md bg-zinc-50 p-1.5 text-zinc-400 hover:text-zinc-600"><Volume2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                        <div className="bg-white p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Simple</div>
                              <div className="text-base font-semibold text-zinc-900">{verb.past} <span className="text-xs font-normal text-zinc-400">/{verb.trPast}/</span></div>
                            </div>
                            <button onClick={() => speakText(primaryVariant(verb.past), settings.speechRate)} className="shrink-0 rounded-md bg-zinc-50 p-1.5 text-zinc-400 hover:text-zinc-600"><Volume2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                        <div className="bg-white p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Participle</div>
                              <div className="text-base font-semibold text-zinc-900">{verb.pp} <span className="text-xs font-normal text-zinc-400">/{verb.trPP}/</span></div>
                            </div>
                            <button onClick={() => speakText(primaryVariant(verb.pp), settings.speechRate)} className="shrink-0 rounded-md bg-zinc-50 p-1.5 text-zinc-400 hover:text-zinc-600"><Volume2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-6 text-zinc-400 text-center">Ничего не найдено. Сбрось фильтр или очисти поиск.</div>
              )}
            </div>
          ) : null}

          {tab === "mistakes" ? (
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-zinc-900">Работа над ошибками</h1>
                <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">{enrichedVerbs.filter((v) => v.progress.mistaken).length} слов</span>
              </div>

              {enrichedVerbs.filter((v) => v.progress.mistaken).length ? (
                <>
                  <div className="flex gap-2">
                    <FilterChip active={mistakesMode === "list"} onClick={() => setMistakesMode("list")}>Список</FilterChip>
                    <FilterChip active={mistakesMode === "train"} onClick={() => { setMistakesMode("train"); setQuizFilter("mistakes"); setFeedback(null); setAnswerPast(""); setAnswerPP(""); setChoiceSelected(""); setTranslateSelected(""); const pool = enrichedVerbs.filter((v) => v.progress.mistaken); if (pool.length) setQuizVerbBase(shuffle(pool)[0].base); }}>Тренировать</FilterChip>
                  </div>

                  {mistakesMode === "list" ? (
                    <div className="space-y-3">
                      {enrichedVerbs.filter((v) => v.progress.mistaken).map((v) => (
                        <div key={v.base} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-rose-100">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                <div className="text-2xl font-semibold text-zinc-900">{v.base}</div>
                                <span className="text-sm text-zinc-400">/{v.tr}/</span>
                              </div>
                              <div className="mt-0.5 text-sm text-zinc-500">{v.ru}</div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="text-xs text-rose-500">{v.progress.wrong} ош.</span>
                              <button onClick={() => speakVerb(v, settings.speechRate)} className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition hover:bg-zinc-200"><Volume2 className="h-4 w-4" /></button>
                            </div>
                          </div>
                          <div className="mt-3 grid gap-px overflow-hidden rounded-xl bg-zinc-100 md:grid-cols-3">
                            <div className="bg-white p-3">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
                              <div className="text-base font-semibold text-zinc-900">{v.base}</div>
                            </div>
                            <div className="bg-white p-3">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Simple</div>
                              <div className="text-base font-semibold text-zinc-900">{v.past}</div>
                            </div>
                            <div className="bg-white p-3">
                              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Participle</div>
                              <div className="text-base font-semibold text-zinc-900">{v.pp}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">Исправь ошибку</div>
                            <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-zinc-900">{quizVerb?.base}</h2>
                            <div className="mt-1 text-zinc-500">{quizVerb?.ru}</div>
                          </div>
                          <button onClick={() => speakVerb(quizVerb, settings.speechRate)} className="rounded-xl bg-zinc-100 p-3 text-zinc-600 transition hover:bg-zinc-200"><Volume2 className="h-5 w-5" /></button>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Simple</label>
                            <input value={answerPast} onChange={(e) => setAnswerPast(e.target.value)} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Введи Past Simple" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-60" />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Participle</label>
                            <input value={answerPP} onChange={(e) => setAnswerPP(e.target.value)} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Введи Past Participle" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:opacity-60" />
                          </div>
                        </div>

                        {feedback ? (
                          <div className="mt-4">
                            <button type="button" onClick={() => { const pool = enrichedVerbs.filter((v) => v.progress.mistaken); if (!pool.length) { setMistakesMode("list"); return; } const next = shuffle(pool).find((v) => v.base !== quizVerb?.base) || pool[0]; setQuizVerbBase(next.base); setAnswerPast(""); setAnswerPP(""); setFeedback(null); }} className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Следующий →</button>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <button type="button" onClick={submitQuiz} className="w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-800">Проверить</button>
                          </div>
                        )}

                        {feedback ? (
                          <div className="mt-4 space-y-2">
                            <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPast ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                              <div>
                                <span className="font-medium">Past Simple: </span>
                                {feedback.okPast ? (
                                  <span>{feedback.userPast} ✓</span>
                                ) : (
                                  <span><s className="text-rose-400">{feedback.userPast || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.past}</span></span>
                                )}
                              </div>
                            </div>
                            <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPP ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                              <div>
                                <span className="font-medium">Past Participle: </span>
                                {feedback.okPP ? (
                                  <span>{feedback.userPP} ✓</span>
                                ) : (
                                  <span><s className="text-rose-400">{feedback.userPP || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.pp}</span></span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="text-center text-xs text-zinc-400">Осталось: {enrichedVerbs.filter((v) => v.progress.mistaken).length} слов с ошибками</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-2xl bg-white p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-teal-300 mb-3" />
                  <div className="text-zinc-800 font-medium">Ошибок пока нет</div>
                  <div className="mt-1 text-sm text-zinc-400">Проходи тесты — слова с ошибками появятся здесь</div>
                </div>
              )}
            </div>
          ) : null}

          {tab === "progress" ? (
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <StatCard icon={CheckCircle2} label="Выучено" value={`${stats.mastered}/${VERBS.length}`} hint={`${VERBS.length} глаголов`} onClick={() => setOpenStat(openStat === "mastered" ? null : "mastered")} active={openStat === "mastered"} />
                <StatCard icon={Trophy} label="Точность" value={`${stats.accuracy}%`} onClick={() => setOpenStat(openStat === "accuracy" ? null : "accuracy")} active={openStat === "accuracy"} />
                <StatCard icon={Star} label="Избранное" value={stats.starred} onClick={() => setOpenStat(openStat === "starred" ? null : "starred")} active={openStat === "starred"} />
                <StatCard icon={Brain} label="Повторений" value={stats.reviews} onClick={() => setOpenStat(openStat === "reviews" ? null : "reviews")} active={openStat === "reviews"} />
              </div>


              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-zinc-500">Дневная цель</div>
                    <div className="mt-1 text-2xl font-bold text-zinc-800">{todayDone} / {settings.dailyGoal}</div>
                  </div>
                  <Badge tone="dark">{dailyGoalPercent}%</Badge>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${dailyGoalPercent}%` }} /></div>
                <div className="mt-4 flex items-center justify-between gap-3 text-sm text-zinc-500"><span>Общий прогресс</span><span>{masteredPercent}% списка</span></div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${masteredPercent}%` }} /></div>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-zinc-500">Серия дней</div>
                    <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-zinc-800"><Flame className="h-6 w-6 text-amber-500" />{appMeta.streak || 0}</div>
                  </div>
                  <Badge tone="rose">{stats.hard} сложных</Badge>
                </div>
                <div className="mt-5 space-y-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-600">Цель в день</label>
                    <input type="number" min="5" max="200" value={settings.dailyGoal} onChange={(e) => setSettings((prev) => ({ ...prev, dailyGoal: Math.max(5, Number(e.target.value) || 20) }))} className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-600">Скорость озвучки</label>
                    <input type="range" min="0.7" max="1.1" step="0.05" value={settings.speechRate} onChange={(e) => setSettings((prev) => ({ ...prev, speechRate: Number(e.target.value) }))} className="w-full" />
                    <div className="mt-1 text-sm text-zinc-500">{settings.speechRate.toFixed(2)}x</div>
                  </div>
                  <button onClick={() => setSettings((prev) => ({ ...prev, autoplayAudio: !prev.autoplayAudio }))} className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${settings.autoplayAudio ? "bg-teal-700 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{settings.autoplayAudio ? "Автоозвучка включена" : "Включить автоозвучку карточек"}</button>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <div className="text-lg font-bold text-zinc-800">Данные</div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button onClick={exportProgress} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition hover:border-teal-400 hover:text-teal-700"><Download className="h-4 w-4" />Экспорт</button>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition hover:border-teal-400 hover:text-teal-700"><Upload className="h-4 w-4" />Импорт</button>
                  <button onClick={shareApp} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition hover:border-teal-400 hover:text-teal-700"><Share2 className="h-4 w-4" />Поделиться</button>
                  <button onClick={resetAll} className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 border border-red-200 transition hover:bg-red-100"><X className="h-4 w-4" />Сбросить</button>
                </div>
                <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importProgress} />
              </div>
            </div>
          ) : null}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-t border-zinc-200 px-4 py-3">
          <div className="mx-auto flex w-full max-w-xl gap-2 p-1">
            <BottomTab active={tab === "words"} onClick={() => setTab("words")} icon={BookOpen} label="Словарь" />
            <BottomTab active={tab === "learn"} onClick={() => setTab("learn")} icon={Brain} label="Тест" />
            <BottomTab active={tab === "mistakes"} onClick={() => setTab("mistakes")} icon={AlertTriangle} label="Ошибки" />
            <BottomTab active={tab === "progress"} onClick={() => setTab("progress")} icon={Trophy} label="Прогресс" />
          </div>
        </nav>

        {openStat ? (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <h2 className="text-lg font-semibold text-zinc-900">
                {openStat === "mastered" && "Выученные слова"}
                {openStat === "starred" && "Избранные слова"}
                {openStat === "reviews" && "Самые повторяемые"}
                {openStat === "accuracy" && "Точность по словам"}
              </h2>
              <button type="button" onClick={() => setOpenStat(null)} className="rounded-lg bg-zinc-100 p-2 text-zinc-600 transition hover:bg-zinc-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {openStat === "mastered" ? (
                enrichedVerbs.filter((v) => v.progress.known).length ? (
                  enrichedVerbs.filter((v) => v.progress.known).map((v) => (
                    <div key={v.base} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5">
                      <div>
                        <span className="font-medium text-zinc-900">{v.base}</span>
                        <span className="ml-2 text-sm text-zinc-400">{v.past} — {v.pp}</span>
                      </div>
                      <span className="text-sm text-zinc-500">{v.ru}</span>
                    </div>
                  ))
                ) : <div className="text-sm text-zinc-400 text-center py-8">Пока нет выученных слов. Пройди тест, чтобы выучить!</div>
              ) : null}

              {openStat === "starred" ? (
                enrichedVerbs.filter((v) => v.progress.starred).length ? (
                  enrichedVerbs.filter((v) => v.progress.starred).map((v) => (
                    <div key={v.base} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5">
                      <div>
                        <span className="font-medium text-zinc-900">{v.base}</span>
                        <span className="ml-2 text-sm text-zinc-400">{v.past} — {v.pp}</span>
                      </div>
                      <span className="text-sm text-zinc-500">{v.ru}</span>
                    </div>
                  ))
                ) : <div className="text-sm text-zinc-400 text-center py-8">Нет избранных слов. Нажми звёздочку в словаре!</div>
              ) : null}

              {openStat === "reviews" ? (
                enrichedVerbs.filter((v) => v.progress.reviews > 0).length ? (
                  [...enrichedVerbs].filter((v) => v.progress.reviews > 0).sort((a, b) => b.progress.reviews - a.progress.reviews).map((v) => (
                    <div key={v.base} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5">
                      <div>
                        <span className="font-medium text-zinc-900">{v.base}</span>
                        <span className="ml-2 text-sm text-zinc-400">{v.past} — {v.pp}</span>
                      </div>
                      <span className="text-sm font-medium text-teal-700">{v.progress.reviews} повт.</span>
                    </div>
                  ))
                ) : <div className="text-sm text-zinc-400 text-center py-8">Пока нет повторений. Начни тестирование!</div>
              ) : null}

              {openStat === "accuracy" ? (
                enrichedVerbs.filter((v) => (v.progress.right || 0) + (v.progress.wrong || 0) > 0).length ? (
                  [...enrichedVerbs].filter((v) => (v.progress.right || 0) + (v.progress.wrong || 0) > 0).sort((a, b) => {
                    const aTotal = a.progress.right + a.progress.wrong;
                    const bTotal = b.progress.right + b.progress.wrong;
                    return (aTotal ? a.progress.right / aTotal : 0) - (bTotal ? b.progress.right / bTotal : 0);
                  }).map((v) => {
                    const total = (v.progress.right || 0) + (v.progress.wrong || 0);
                    const acc = total ? Math.round((v.progress.right / total) * 100) : 0;
                    return (
                      <div key={v.base} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5">
                        <div>
                          <span className="font-medium text-zinc-900">{v.base}</span>
                          <span className="ml-2 text-sm text-zinc-400">{v.progress.right}✓ {v.progress.wrong}✗</span>
                        </div>
                        <span className={`text-sm font-medium ${acc >= 80 ? "text-teal-700" : acc >= 50 ? "text-amber-600" : "text-red-600"}`}>{acc}%</span>
                      </div>
                    );
                  })
                ) : <div className="text-sm text-zinc-400 text-center py-8">Пока нет данных. Пройди тест!</div>
              ) : null}

            </div>
          </div>
        ) : null}

        {toast ? <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md">{toast}</div> : null}
      </div>
    </div>
  );
}
