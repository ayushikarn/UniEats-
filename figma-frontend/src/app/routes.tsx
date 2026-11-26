import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Compass,
  Heart,
  Home as HomeIcon,
  Leaf,
  Menu,
  MessageCircleMore,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Star,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { fetchMenuItems, sendChatMessage, MenuItem } from "../services/api";

type Food = MenuItem;

const categories = [
  { name: "Meals", icon: "🍱", tone: "peach" },
  { name: "Snacks", icon: "🥟", tone: "yellow" },
  { name: "Beverages", icon: "🧋", tone: "lavender" },
  { name: "Desserts", icon: "🍰", tone: "pink" },
  { name: "Fast Food", icon: "🍔", tone: "mint" },
  { name: "Healthy Food", icon: "🥗", tone: "blue" },
];

function Mascot({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mascot ${compact ? "mascot-compact" : ""}`} aria-label="Uni, the UniEats food buddy">
      <svg viewBox="0 0 330 330" role="img" aria-hidden="true">
        <ellipse cx="164" cy="297" rx="104" ry="17" fill="#6d4934" opacity=".12" />
        <path d="M96 117C94 43 230 27 242 111c21 12 31 53 5 79H82c-24-34-10-67 14-73Z" fill="#51362e" />
        <path d="M112 76c-18 7-31 23-34 43 20-5 35-18 45-36 18 23 52 34 91 27-8-35-67-55-102-34Z" fill="#67433a" />
        <circle cx="164" cy="138" r="70" fill="#ffd8c4" />
        <path d="M98 129c8-55 38-77 70-70 37 7 57 32 59 68-28-2-56-16-75-39-14 22-33 36-54 41Z" fill="#5a3a32" />
        <path d="M119 139c9-10 22-9 29 1" fill="none" stroke="#5d4037" strokeWidth="5" strokeLinecap="round" />
        <path d="M181 140c8-10 21-9 28 1" fill="none" stroke="#5d4037" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="135" cy="149" rx="8" ry="11" fill="#493128" />
        <ellipse cx="195" cy="149" rx="8" ry="11" fill="#493128" />
        <circle cx="138" cy="145" r="3" fill="white" />
        <circle cx="198" cy="145" r="3" fill="white" />
        <ellipse cx="113" cy="169" rx="13" ry="6" fill="#f7a5a2" opacity=".55" />
        <ellipse cx="216" cy="169" rx="13" ry="6" fill="#f7a5a2" opacity=".55" />
        <path d="M151 169c8 10 19 10 27 0" fill="none" stroke="#a55a5a" strokeWidth="4" strokeLinecap="round" />
        <path d="M105 202c32-25 85-24 118 1l17 93H88l17-94Z" fill="#f58f79" />
        <path d="M134 197l30 23 31-23 11 99h-84l12-99Z" fill="#fff8e9" />
        <path d="M109 213c-24 13-34 39-40 61l23 8 28-52-11-17ZM221 210c25 10 38 30 45 50l-21 12-35-45 11-17Z" fill="#ffd8c4" />
        <path d="M101 256c37-19 90-19 128 0l-10 33H111l-10-33Z" fill="#b8dcca" />
        <rect x="103" y="251" width="126" height="13" rx="6.5" fill="#855f4a" />
        <path d="M136 247c2-25 52-26 56 0" fill="#fff7e8" stroke="#e2b567" strokeWidth="4" />
        <circle cx="164" cy="234" r="9" fill="#ed6c67" />
        <path d="M155 229c-4-8-12-5-14-2 5 1 10 3 14 2Z" fill="#6fa86f" />
        <path d="M101 199c5-9 13-13 22-14M206 185c10 2 17 7 21 15" fill="none" stroke="#51362e" strokeWidth="7" strokeLinecap="round" />
        <path d="M233 81c8 4 15 11 18 20M73 83c-7 5-12 12-14 20" fill="none" stroke="#f4b846" strokeWidth="6" strokeLinecap="round" className="mascot-spark" />
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="UniEats home">
      <span className="logo-mark"><Utensils size={19} strokeWidth={2.6} /></span>
      <span>Uni<span>Eats</span></span>
    </Link>
  );
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setMenuOpen(false), [location.pathname]);
  return (
    <div className="app-shell">
      <header className="nav-wrap">
        <nav className="navbar" aria-label="Main navigation">
          <Logo />
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end><HomeIcon size={17} /> Home</NavLink>
            <NavLink to="/explore"><Compass size={17} /> Explore Food</NavLink>
            <NavLink to="/chat"><Sparkles size={17} /> AI Food Buddy</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <Link className="nav-cta" to="/chat"><MessageCircleMore size={18} /> Ask Uni</Link>
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>
        <div><Logo /><p>Good food, better campus days.</p></div>
        <div className="footer-links">
          <Link to="/explore">Explore food</Link>
          <Link to="/chat">Ask Uni</Link>
          <Link to="/about">About</Link>
        </div>
        <p className="footer-note">Made for hungry students · Menu data from Google Sheets.</p>
      </footer>
    </div>
  );
}

function SearchBar({ initial = "", compact = false }: { initial?: string; compact?: boolean }) {
  const [query, setQuery] = useState(initial);
  const navigate = useNavigate();
  function submit(e: FormEvent) {
    e.preventDefault();
    navigate(`/explore${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }
  return (
    <form className={`search-bar ${compact ? "compact" : ""}`} onSubmit={submit}>
      <Search size={21} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pizza, coffee, momos, outlets..." aria-label="Search foods and outlets" />
      <button type="submit">{compact ? <ArrowRight size={20} /> : <>Search food <ArrowRight size={18} /></>}</button>
    </form>
  );
}

function FoodCard({ food, compact = false }: { food: Food; compact?: boolean }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className={`food-card ${compact ? "food-card-compact" : ""}`}>
      <div className="food-image">
        <img src={food.image} alt="" />
        {!compact && <button className={`heart-button ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? `Remove ${food.name} from favourites` : `Add ${food.name} to favourites`}><Heart size={18} fill={liked ? "currentColor" : "none"} /></button>}
      </div>
      <div className="food-copy">
        <div className="food-topline"><span>{food.category}</span><strong>₹{food.price}</strong></div>
        <h3>{food.name}</h3>
        <p>{food.outlet}</p>
        {compact && <p className="reason"> {food.flavour} • {food.spiceLevel} </p>}
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <div className="food-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <article key={i} className="food-card skeleton">
          <div className="food-image skeleton" />
          <div className="food-copy">
            <div className="food-topline skeleton">
              <span className="skeleton" />
              <strong className="skeleton" />
            </div>
            <h3 className="skeleton" />
            <p className="skeleton" />
          </div>
        </article>
      ))}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="empty-state">
      <span>⚠️</span>
      <h2>Couldn't load menu</h2>
      <p>Something went wrong while fetching the menu data.</p>
      <button className="primary-button" onClick={onRetry}>Try again</button>
    </div>
  );
}

function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function loadMenu() {
      try {
        setLoading(true);
        const data = await fetchMenuItems();
        if (mounted) {
          setFoods(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load menu");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadMenu();
    return () => { mounted = false; };
  }, []);

  const popularFoods = useMemo(() => foods.filter((food) => food.popular).slice(0, 4), [foods]);

  return (
    <>
      <section className="hero section">
        <div className="eyebrow"><Sparkles size={15} /> Your campus food shortcut</div>
        <h1>Craving something <span>good?</span></h1>
        <p className="hero-sub">Find your campus favourites or let us help you decide what to eat today!</p>
        <div className="journeys">
          <div className="journey search-journey">
            <div className="journey-icon"><Search /></div>
            <div>
              <span className="option-label">Option A</span>
              <h2>I know what I want!</h2>
              <p>Explore food, check prices and discover what's available around campus.</p>
            </div>
            <SearchBar />
            <div className="quick-searches">
              <span>Try:</span>
              {["Momos", "Coffee", "Under ₹100"].map((item) => <button key={item} onClick={() => navigate(`/explore?q=${encodeURIComponent(item)}`)}>{item}</button>)}
            </div>
          </div>
          <button className="journey buddy-journey" onClick={() => navigate("/chat")} aria-label="Chat with Uni, your AI food buddy">
            <div className="speech-bubble">Psst... hungry? Let's find something yummy!</div>
            <Mascot />
            <div className="buddy-copy">
              <span className="option-label">Option B · AI-powered</span>
              <h2>Can't decide? Let me help!</h2>
              <p>Tell me your mood, budget and cravings. I'll find something delicious!</p>
              <span className="button-like">Chat with Uni <MessageCircleMore size={18} /></span>
            </div>
          </button>
        </div>
        <div className="scroll-note"><span /> Scroll for campus favourites</div>
      </section>

      <section className="section content-section">
        <div className="section-heading">
          <div><span className="kicker">Trending now</span><h2>Popular on campus</h2><p>The bites everyone's talking about today.</p></div>
          <Link to="/explore">Explore all <ArrowRight size={17} /></Link>
        </div>
        {loading ? <LoadingState /> : error ? <ErrorState onRetry={() => window.location.reload()} /> : <div className="food-grid popular-row">{popularFoods.map((food) => <FoodCard key={food.id} food={food} />)}</div>}
      </section>

      <section className="section content-section categories-section">
        <div className="section-heading"><div><span className="kicker">Pick a vibe</span><h2>Explore categories</h2></div></div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className={`category-card ${category.tone}`} to={`/explore?category=${encodeURIComponent(category.name)}`} key={category.name}>
              <span>{category.icon}</span><strong>{category.name}</strong><ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="why-intro"><span className="kicker">Made for campus life</span><h2>Why UniEats?</h2><p>Less scrolling, fewer "I don't know" moments, and more food you'll actually love.</p><Link className="primary-button" to="/about">Meet UniEats <ArrowRight size={18} /></Link></div>
        <div className="benefit-grid">
          <article><span><Compass /></span><h3>Find it fast</h3><p>Discover what's open and available around campus.</p></article>
          <article><span><WalletCards /></span><h3>Stay on budget</h3><p>Filter by price and find satisfying student-friendly picks.</p></article>
          <article><span><Sparkles /></span><h3>Picked for you</h3><p>Get friendly recommendations based on your exact mood.</p></article>
        </div>
      </section>
    </>
  );
} 
function Explore() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = params.get("category") || "All";
  const diet = params.get("diet") || "All";
  const maxPrice = Number(params.get("max") || 500);

  useEffect(() => {
    let mounted = true;
    async function loadMenu() {
      try {
        setLoading(true);
        const data = await fetchMenuItems();
        if (mounted) {
          setFoods(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load menu");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadMenu();
    return () => { mounted = false; };
  }, []);

  const results = useMemo(() => {
    if (loading) return [];
    return foods.filter((food) => {
      const query = (params.get("q") || "").toLowerCase();
      const matchesQuery = !query ||
        `${food.name} ${food.outlet} ${food.category} ${food.foodCourt}`.toLowerCase().includes(query) ||
        (query.includes("under") && food.price <= Number(query.match(/\d+/)?.[0] || 500));
      const matchesCategory = category === "All" || food.category === category;
      const matchesDiet = diet === "All" || (diet === "Veg" ? food.veg : !food.veg);
      return matchesQuery && matchesCategory && matchesDiet && food.price <= maxPrice;
    });
  }, [params, category, diet, maxPrice, foods, loading]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    value === "All" || value === "500" || !value ? next.delete(key) : next.set(key, value);
    setParams(next);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    update("q", search.trim());
  }

  function reset() {
    setSearch("");
    setParams({});
  }

  return (
    <div className="page">
      <section className="explore-header">
        <div className="eyebrow"><Utensils size={15} /> Campus menu explorer</div>
        <h1>What are you in the mood for?</h1>
        <p>Browse campus food by craving, dietary preference and budget.</p>
        <form className="search-bar explore-search" onSubmit={submit}>
          <Search size={21} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pizza, coffee, momos, outlets..." /><button type="submit">Search <ArrowRight size={18} /></button>
        </form>
      </section>
      <div className="explore-layout">
        <aside className="filters">
          <div className="filter-title"><h2><SlidersHorizontal size={19} /> Filters</h2><button onClick={reset}>Reset</button></div>
          <div className="filter-group"><h3>Food type</h3>
            <div className="segmented">
              {["All", "Veg", "Non-veg"].map((item) => <button className={diet === item ? "selected" : ""} onClick={() => update("diet", item)} key={item}>{item === "Veg" && <Leaf size={14} />}{item}</button>)}
            </div>
          </div>
          <div className="filter-group"><h3>Maximum price <strong>₹{maxPrice}</strong></h3><input type="range" min="15" max="500" step="25" value={maxPrice} onChange={(e) => update("max", e.target.value)} /><div className="range-labels"><span>₹15</span><span>₹500+</span></div></div>
          <div className="filter-group"><h3>Category</h3><div className="category-filter">
            {["All", ...categories.map((item) => item.name)].map((item) => <button className={category === item ? "selected" : ""} onClick={() => update("category", item)} key={item}>{item}{category === item && <Check size={14} />}</button>)}
          </div></div>
          <div className="filter-group"><h3>Spice level</h3><div className="category-filter">
            {["All", "Not spicy", "Mild", "Medium", "High"].map((item) => <button className={item === "All" ? "selected" : ""} onClick={() => update("spice", item)} key={item}>{item}</button>)}
          </div></div>
          <div className="filter-group"><h3>Food court</h3><div className="category-filter">
            {["All", ...Array.from(new Set(foods.map(f => f.foodCourt))).filter(Boolean)].map((item) => <button className={item === "All" ? "selected" : ""} onClick={() => update("court", item)} key={item}>{item}</button>)}
          </div></div>
          <button className="ask-uni-card" onClick={() => window.location.assign("/chat")}><span><Bot /></span><strong>Still unsure?</strong><small>Ask Uni for a personal pick</small><ArrowRight size={18} /></button>
        </aside>
        <section className="results-panel">
          <div className="results-heading"><div><span>{results.length} results</span><h2>{params.get("q") ? `Results for "${params.get("q")}"` : category === "All" ? "All campus food" : category}</h2></div>{loading ? <div className="data-note"><Clock3 size={14} /> Loading...</div> : <span className="data-note"><Clock3 size={14} /> {foods.length} items from Google Sheets</span>}</div>
          <div className="active-filters">
            {category !== "All" && <button onClick={() => update("category", "All")}>{category} <X size={13} /></button>}
            {diet !== "All" && <button onClick={() => update("diet", "All")}>{diet} <X size={13} /></button>}
            {maxPrice < 500 && <button onClick={() => update("max", "500")}>Under ₹{maxPrice} <X size={13} /></button>}
          </div>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={() => window.location.reload()} />
          ) : results.length ? (
            <div className="food-grid results-grid">{results.map((food) => <FoodCard food={food} key={food.id} />)}</div>
          ) : (
            <div className="empty-state"><span>🍽️</span><h2>No tasty matches yet</h2><p>Try a different craving or loosen your filters a little.</p><button className="primary-button" onClick={reset}>Clear all filters</button></div>
          )}
        </section>
      </div>
    </div>
  );
}

type ChatMessage = { role: "uni" | "user"; text: string; recommendations?: Food[] };

const prompts = [
  "I'm hungry but can't decide.",
  "Find something under ₹100.",
  "Show me vegetarian options.",
  "I want something spicy.",
  "Recommend something filling.",
  "Show me popular campus food.",
];

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function send(text = input) {
    const clean = text.trim();

    if (!clean || typing) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: clean },
    ]);

    setInput("");
    setTyping(true);

    try {
      const result = await sendChatMessage(clean, conversationId);
      setConversationId(result.conversationId);

      setMessages((current) => [
        ...current,
        {
          role: "uni",
          text: result.reply,
          recommendations: result.recommendations,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "uni",
          text: error instanceof Error
            ? error.message
            : "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  return (
    <div className="chat-page">
      <aside className="chat-sidebar">
        <button className="back-link" onClick={() => navigate("/explore")}><ArrowLeft size={18} /> Back to food</button>
        <div className="side-mascot"><Mascot compact /><span className="online-dot" /></div>
        <h1>Chat with Uni</h1><p>Your cheerful campus food buddy, ready to help with every craving.</p>
        <div className="uni-status"><span><Sparkles size={16} /></span><div><strong>Uni is online</strong><small>Usually replies instantly</small></div></div>
        {messages.length > 0 && <button className="new-chat" onClick={() => {
          setMessages([]);
          setConversationId(undefined);
        }}><MessageCircleMore size={17} /> Start a new chat</button>}
      </aside>
      <section className="chat-shell">
        <header className="chat-header">
          <div className="chat-avatar"><Mascot compact /></div><div><strong>Uni</strong><span><i /> Your campus food buddy</span></div>
          <Link to="/explore" className="browse-link">Browse food <Compass size={17} /></Link>
        </header>
        <div className={`message-area ${messages.length === 0 ? "welcome-state" : ""}`}>
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="welcome-mascot"><Mascot /></div>
              <span className="kicker">A little food magic</span>
              <h2>Hey foodie! I'm Uni, your campus food buddy. Let's find something delicious today!</h2>
              <p>Tell me what sounds good, or tap one of these to get started.</p>
              <div className="prompt-grid">{prompts.map((prompt, index) => <button onClick={() => send(prompt)} key={prompt}><span>{["🍽️", "💸", "🌱", "🌶️", "⚡", "⭐"][index]}</span>{prompt}<ChevronRight size={16} /></button>)}</div>
            </div>
          ) : (
            <div className="conversation">
              <div className="message-row uni"><div className="message-avatar"><Mascot compact /></div><div className="message-bubble">Hey foodie! I'm Uni, your campus food buddy. Let's find something delicious today!</div></div>
              {messages.map((message, index) => (
                <div className={`message-row ${message.role}`} key={index}>
                  {message.role === "uni" && <div className="message-avatar"><Mascot compact /></div>}
                  <div className="message-content">
                    <div className="message-bubble">{message.text}</div>
                    {message.recommendations && <div className="chat-recommendations">{message.recommendations.map((food) => <FoodCard compact food={food} key={food.id} />)}<button className="more-results" onClick={() => navigate("/explore")}>See more campus food <ArrowRight size={16} /></button></div>}
                  </div>
                </div>
              ))}
              {typing && <div className="message-row uni"><div className="message-avatar"><Mascot compact /></div><div className="message-bubble typing"><i /><i /><i /></div></div>}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
        <div className="chat-composer">
          {messages.length > 0 && <div className="mini-prompts">{prompts.slice(1, 4).map((prompt) => <button onClick={() => send(prompt)} key={prompt}>{prompt}</button>)}</div>}
          <form onSubmit={submit}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tell me what you're craving..." aria-label="Message Uni" /><button disabled={!input.trim() || typing} aria-label="Send message"><Send size={20} /></button></form>
          <small>Uni's suggestions use menu data from Google Sheets.</small>
        </div>
      </section>
    </div>
  );
}
function About() {
  return (
    <div className="about-page page">
      <section className="about-hero"><div><span className="eyebrow"><Heart size={15} /> Built for student life</span><h1>Campus food should be <span>easy to love.</span></h1><p>UniEats brings campus menus, student-friendly filters and an AI food buddy together in one joyful place.</p><div className="about-actions"><Link className="primary-button" to="/explore">Explore food <ArrowRight size={18} /></Link><Link className="secondary-button" to="/chat">Chat with Uni</Link></div></div><div className="about-mascot"><div className="speech-bubble">No more "where should we eat?"</div><Mascot /></div></section>
      <section className="about-values"><article><Compass /><h2>Everything in one place</h2><p>Search across campus outlets without hopping between scattered menus.</p></article><article><WalletCards /><h2>Budget comes first</h2><p>See clear prices and find options that fit your student budget.</p></article><article><Star /><h2>Your taste, remembered</h2><p>Uni is designed to support smarter, AI-generated recommendations as the platform grows.</p></article></section>
      <section className="data-banner"><div><span className="kicker">Built to grow</span><h2>Fresh menu data, friendly recommendations.</h2><p>Menu items are loaded live from Google Sheets via the UniEats backend.</p></div><Link to="/explore">See the prototype <ArrowRight size={17} /></Link></section>
    </div>
  );
}

function NotFound() {
  return <div className="not-found"><span>🍜</span><h1>Oops, this plate is empty.</h1><p>The page you're looking for isn't on today's menu.</p><Link className="primary-button" to="/">Back home</Link></div>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "explore", Component: Explore },
      { path: "chat", Component: Chat },
      { path: "about", Component: About },
      { path: "*", Component: NotFound },
    ],
  },
]);

