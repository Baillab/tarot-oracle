export namespace tarot {
	
	export class CardMeaning {
	    text: string;
	    love: string;
	    career: string;
	    finance: string;
	    health: string;
	    advice: string;
	
	    static createFrom(source: any = {}) {
	        return new CardMeaning(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.text = source["text"];
	        this.love = source["love"];
	        this.career = source["career"];
	        this.finance = source["finance"];
	        this.health = source["health"];
	        this.advice = source["advice"];
	    }
	}
	export class Card {
	    id: string;
	    name: string;
	    arcana: string;
	    number: number;
	    suit?: string;
	    image: string;
	    keywords: string[];
	    upright: CardMeaning;
	    reversed: CardMeaning;
	
	    static createFrom(source: any = {}) {
	        return new Card(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.arcana = source["arcana"];
	        this.number = source["number"];
	        this.suit = source["suit"];
	        this.image = source["image"];
	        this.keywords = source["keywords"];
	        this.upright = this.convertValues(source["upright"], CardMeaning);
	        this.reversed = this.convertValues(source["reversed"], CardMeaning);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class DrawnCard {
	    card: Card;
	    isReversed: boolean;
	    quickAnswer?: string;
	    historyId?: number;
	
	    static createFrom(source: any = {}) {
	        return new DrawnCard(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.card = this.convertValues(source["card"], Card);
	        this.isReversed = source["isReversed"];
	        this.quickAnswer = source["quickAnswer"];
	        this.historyId = source["historyId"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DailyCard {
	    date: string;
	    card: DrawnCard;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new DailyCard(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.date = source["date"];
	        this.card = this.convertValues(source["card"], DrawnCard);
	        this.message = source["message"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DailyAnimation {
	    card: DailyCard;
	    startX: number;
	    startY: number;
	    startScale: number;
	    x: number;
	    y: number;
	    scale: number;
	    rotation: number;
	    delay: number;
	    duration: number;
	    glow: boolean;
	    particles: boolean;
	
	    static createFrom(source: any = {}) {
	        return new DailyAnimation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.card = this.convertValues(source["card"], DailyCard);
	        this.startX = source["startX"];
	        this.startY = source["startY"];
	        this.startScale = source["startScale"];
	        this.x = source["x"];
	        this.y = source["y"];
	        this.scale = source["scale"];
	        this.rotation = source["rotation"];
	        this.delay = source["delay"];
	        this.duration = source["duration"];
	        this.glow = source["glow"];
	        this.particles = source["particles"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	export class GuideSection {
	    title: string;
	    text: string;
	
	    static createFrom(source: any = {}) {
	        return new GuideSection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.text = source["text"];
	    }
	}
	export class HistoryRecord {
	    id: number;
	    // Go type: time
	    date: any;
	    type: string;
	    name: string;
	    spreadId?: string;
	    question: string;
	    comment?: string;
	    cards: DrawnCard[];
	
	    static createFrom(source: any = {}) {
	        return new HistoryRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.date = this.convertValues(source["date"], null);
	        this.type = source["type"];
	        this.name = source["name"];
	        this.spreadId = source["spreadId"];
	        this.question = source["question"];
	        this.comment = source["comment"];
	        this.cards = this.convertValues(source["cards"], DrawnCard);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LegalSection {
	    title: string;
	    paragraphs: string[];
	
	    static createFrom(source: any = {}) {
	        return new LegalSection(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.paragraphs = source["paragraphs"];
	    }
	}
	export class LegalDocs {
	    privacy: LegalSection;
	    terms: LegalSection;
	
	    static createFrom(source: any = {}) {
	        return new LegalDocs(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.privacy = this.convertValues(source["privacy"], LegalSection);
	        this.terms = this.convertValues(source["terms"], LegalSection);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class QuestionCategory {
	    id: string;
	    label: string;
	    questions: string[];
	
	    static createFrom(source: any = {}) {
	        return new QuestionCategory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.label = source["label"];
	        this.questions = source["questions"];
	    }
	}
	export class SpreadPosition {
	    index: number;
	    key: string;
	    name: string;
	    description: string;
	    x: number;
	    y: number;
	    rotation: number;
	
	    static createFrom(source: any = {}) {
	        return new SpreadPosition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.index = source["index"];
	        this.key = source["key"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.x = source["x"];
	        this.y = source["y"];
	        this.rotation = source["rotation"];
	    }
	}
	export class Spread {
	    id: string;
	    name: string;
	    description: string;
	    width: number;
	    height: number;
	    positions: SpreadPosition[];
	
	    static createFrom(source: any = {}) {
	        return new Spread(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.positions = this.convertValues(source["positions"], SpreadPosition);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class SpreadCard {
	    position: SpreadPosition;
	    card: Card;
	    isReversed: boolean;
	    quickAnswer?: string;
	
	    static createFrom(source: any = {}) {
	        return new SpreadCard(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.position = this.convertValues(source["position"], SpreadPosition);
	        this.card = this.convertValues(source["card"], Card);
	        this.isReversed = source["isReversed"];
	        this.quickAnswer = source["quickAnswer"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class SpreadResult {
	    spread: Spread;
	    cards: SpreadCard[];
	    quickAnswer?: string;
	    historyId?: number;
	
	    static createFrom(source: any = {}) {
	        return new SpreadResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.spread = this.convertValues(source["spread"], Spread);
	        this.cards = this.convertValues(source["cards"], SpreadCard);
	        this.quickAnswer = source["quickAnswer"];
	        this.historyId = source["historyId"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

