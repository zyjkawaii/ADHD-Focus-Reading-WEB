import { ChangeEvent, DragEvent, ReactNode, useEffect, useRef, useState } from 'react'

type Page = 'home' | 'upload' | 'reading' | 'profile'

type IconName =
  | 'home'
  | 'upload'
  | 'book'
  | 'user'
  | 'play'
  | 'pause'
  | 'reset'
  | 'clock'
  | 'spark'
  | 'arrow'
  | 'file'
  | 'check'
  | 'lock'
  | 'close'

const starterArticle = `Small Steps, Deep Focus

Attention is not a switch that we turn on. It is more like a path through a garden: the more gently and consistently we walk it, the easier it becomes to follow.

For many readers, beginning is the hardest part. A long chapter can feel like a wall before the first sentence has even been read. The secret is to make the doorway smaller. Instead of promising to finish the whole chapter, promise to read for one focused interval.

The Pomodoro method works because it gives attention a clear edge. During a focus session, there is only one job. When the timer ends, the break is not a distraction or a reward that must be earned. It is part of the process.

Designing a Gentle Reading Ritual

Choose a comfortable place and remove only the distractions you can control. Keep water nearby. Put your phone out of reach, but do not spend ten minutes making the environment perfect. A useful ritual should make starting easier, not become another task.

As you read, let your eyes move at their natural pace. If a sentence does not make sense, read it once more. If it still feels unclear, mark it and continue. Momentum often creates understanding that effort alone cannot force.

When your mind wanders, notice it without judgment. Returning to the page is the exercise. Every return is a repetition that strengthens your ability to direct attention.

Progress Over Perfection

Some focus sessions will feel effortless. Others will be messy. Both count. The goal is not to create twenty-five perfect minutes; it is to practice coming back to the words in front of you.

At the end of a session, pause before deciding what comes next. Stretch, breathe, and notice what you finished. A visible record of small sessions turns an abstract ambition into evidence: you are becoming a reader who returns.

One page is progress. One focused minute is practice. Begin where you are, and let consistency do the rest.`

const navItems: { id: Page; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'upload', label: 'Upload', icon: 'upload' },
  { id: 'reading', label: 'Reading zone', icon: 'book' },
  { id: 'profile', label: 'Profile', icon: 'user' },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
    upload: <><path d="M12 16V3m0 0L7 8m5-5 5 5" /><path d="M5 13H3v8h18v-8h-2" /></>,
    book: <><path d="M4 4.5A3.5 3.5 0 0 1 7.5 8H11v12H7.5A3.5 3.5 0 0 0 4 23.5v-19Z" transform="translate(0 -2)" /><path d="M20 4.5A3.5 3.5 0 0 0 16.5 8H13v12h3.5a3.5 3.5 0 0 1 3.5 3.5v-19Z" transform="translate(0 -2)" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    play: <path d="m9 6 9 6-9 6V6Z" />,
    pause: <><path d="M9 6v12M15 6v12" /></>,
    reset: <><path d="M4 10a8 8 0 1 1 1 7" /><path d="M4 4v6h6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    spark: <><path d="m12 2 1.5 5.3L19 9l-5.5 1.7L12 16l-1.5-5.3L5 9l5.5-1.7L12 2Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    file: <><path d="M6 2h8l4 4v16H6V2Z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Mascot({ large = false }: { large?: boolean }) {
  return (
    <svg className={large ? 'mascot mascot-large' : 'mascot'} viewBox="0 0 150 142" role="img" aria-label="Bloo, your reading companion">
      <ellipse cx="75" cy="128" rx="43" ry="7" fill="#bed6e5" opacity=".55" />
      <path d="M45 34c0-16 13-27 30-27s30 11 30 27v42c0 21-13 39-30 39S45 97 45 76V34Z" fill="#91cbe8" stroke="#173f55" strokeWidth="4" />
      <path d="M48 29 35 21l8 24M102 29l13-8-8 24" fill="#91cbe8" stroke="#173f55" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="63" cy="48" r="5" fill="#173f55" />
      <circle cx="88" cy="48" r="5" fill="#173f55" />
      <path d="M69 59c4 3 8 3 12 0" fill="none" stroke="#173f55" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 71c-11-8-25-8-36-3v36c11-5 25-5 36 3V71Z" fill="#fffdf7" stroke="#173f55" strokeWidth="4" strokeLinejoin="round" />
      <path d="M75 71c11-8 25-8 36-3v36c-11-5-25-5-36 3V71Z" fill="#fffdf7" stroke="#173f55" strokeWidth="4" strokeLinejoin="round" />
      <path d="M75 73v33M48 79c7-2 13-1 19 2M83 81c6-3 12-4 19-2M48 88c7-2 13-1 19 2M83 90c6-3 12-4 19-2" fill="none" stroke="#9cb1bb" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 74c-8 2-12 7-12 14M107 74c8 2 12 7 12 14" fill="none" stroke="#173f55" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 113v11M92 113v11" stroke="#173f55" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('bloo-sessions') || 0))
  const [readingText, setReadingText] = useState(() => localStorage.getItem('bloo-reading') || starterArticle)
  const [fileName, setFileName] = useState(() => localStorage.getItem('bloo-file') || 'Small Steps, Deep Focus.txt')
  const [fileSize, setFileSize] = useState('4.2 KB')
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [showSessionComplete, setShowSessionComplete] = useState(false)
  const [showReadingComplete, setShowReadingComplete] = useState(false)
  const [readingStartedAt, setReadingStartedAt] = useState<number | null>(null)
  const [readingDuration, setReadingDuration] = useState(0)
  const readingRef = useRef<HTMLDivElement>(null)

  const totalSeconds = (mode === 'focus' ? focusMinutes : breakMinutes) * 60
  const timerProgress = Math.max(0, Math.min(1, 1 - secondsLeft / totalSeconds))
  const minutesDisplay = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secondsDisplay = String(secondsLeft % 60).padStart(2, '0')

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1
        setRunning(false)
        if (mode === 'focus') {
          const next = sessions + 1
          setSessions(next)
          localStorage.setItem('bloo-sessions', String(next))
          setShowSessionComplete(true)
        }
        return 0
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running, mode, sessions])

  useEffect(() => {
    if (page === 'reading' && !readingStartedAt) {
      setReadingStartedAt(Date.now())
      if (secondsLeft > 0) setRunning(true)
    }
  }, [page, readingStartedAt, secondsLeft])

  const updateFocus = (value: number) => {
    const safeValue = Math.max(1, Math.min(90, value || 1))
    setFocusMinutes(safeValue)
    if (!running && mode === 'focus') setSecondsLeft(safeValue * 60)
  }

  const updateBreak = (value: number) => {
    const safeValue = Math.max(1, Math.min(30, value || 1))
    setBreakMinutes(safeValue)
    if (!running && mode === 'break') setSecondsLeft(safeValue * 60)
  }

  const resetTimer = () => {
    setRunning(false)
    setSecondsLeft(totalSeconds)
  }

  const switchMode = (nextMode: 'focus' | 'break') => {
    setMode(nextMode)
    setRunning(false)
    setSecondsLeft((nextMode === 'focus' ? focusMinutes : breakMinutes) * 60)
  }

  const handleFile = (file?: File) => {
    if (!file) return
    setFileName(file.name)
    setFileSize(file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`)
    localStorage.setItem('bloo-file', file.name)
    if (file.type === 'text/plain' || file.name.match(/\.(txt|md)$/i)) {
      const reader = new FileReader()
      reader.onload = () => {
        const text = String(reader.result || '')
        setReadingText(text)
        localStorage.setItem('bloo-reading', text)
      }
      reader.readAsText(file)
    } else {
      const fallback = `${file.name.replace(/\.[^/.]+$/, '')}\n\nYour document is ready for a focused reading session. For the best in-page reading experience, upload a TXT or Markdown file. PDF and document uploads are safely recognized here and can be replaced at any time.\n\nTake a breath, set your focus interval, and begin when you are ready.`
      setReadingText(fallback)
      localStorage.setItem('bloo-reading', fallback)
    }
  }

  const handleScroll = () => {
    const el = readingRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    const next = max <= 0 ? 100 : Math.min(100, Math.round((el.scrollTop / max) * 100))
    setProgress(next)
    if (next === 100 && !showReadingComplete) {
      const elapsed = readingStartedAt ? Math.max(1, Math.round((Date.now() - readingStartedAt) / 60000)) : 1
      setReadingDuration(elapsed)
      setShowReadingComplete(true)
    }
  }

  const goTo = (nextPage: Page) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Bloo Reader home">
          <span className="brand-mark"> <img src="brand-focu.png" alt="" /> </span>
          <span>Focu<span>Reader</span></span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => goTo(item.id)}>
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="streak-pill"><Icon name="spark" size={16} /><span>{sessions * 120}</span> points</div>
      </header>

      <main>
        {page === 'home' && (
          <section className="page home-page">
            <div className="welcome-row">
              <div>
                <p className="eyebrow">YOUR FOCUS SPACE</p>
                <h1>Ready to read,<br /><em>one page at a time?</em></h1>
                <p className="lead">Settle in, start a focus session, and let Bloo help you stay on track.</p>
              </div>
              <div className="welcome-stats">
                <div><strong>{sessions}</strong><span>sessions completed</span></div>
                <div><strong>{Math.round((sessions * focusMinutes) / 60 * 10) / 10}h</strong><span>focused so far</span></div>
              </div>
            </div>

            <div className="home-grid">
              <section className="timer-card">
                <div className="mode-tabs">
                  <button className={mode === 'focus' ? 'active' : ''} onClick={() => switchMode('focus')}>Focus</button>
                  <button className={mode === 'break' ? 'active' : ''} onClick={() => switchMode('break')}>Break</button>
                </div>
                <div className="timer-ring" style={{ '--timer-progress': `${timerProgress * 360}deg` } as React.CSSProperties}>
                  <div className="timer-inner">
                    <span className="timer-label">{mode === 'focus' ? 'FOCUS TIME' : 'BREAK TIME'}</span>
                    <strong>{minutesDisplay}<i>:</i>{secondsDisplay}</strong>
                    <span>{running ? 'Stay with it' : secondsLeft === 0 ? 'Session complete' : 'Ready when you are'}</span>
                  </div>
                </div>
                <div className="timer-actions">
                  <button className="secondary-icon" onClick={resetTimer} aria-label="Reset timer"><Icon name="reset" /></button>
                  <button className="primary-action" onClick={() => {
                    if (secondsLeft === 0) setSecondsLeft(totalSeconds)
                    setRunning(!running)
                  }}>
                    <Icon name={running ? 'pause' : 'play'} size={22} />
                    {running ? 'Pause session' : 'Start focusing'}
                  </button>
                  <button className="secondary-icon" onClick={() => goTo('reading')} aria-label="Open reading zone"><Icon name="book" /></button>
                </div>
              </section>

              <aside className="side-stack">
                <section className="settings-card">
                  <div className="section-heading">
                    <div><span className="soft-icon"><Icon name="clock" /></span><div><h2>Shape your session</h2><p>Choose a rhythm that works for you.</p></div></div>
                  </div>
                  <label className="time-setting">
                    <span><strong>Focus length</strong><small>A distraction-free reading block</small></span>
                    <span className="stepper">
                      <button onClick={() => updateFocus(focusMinutes - 5)} aria-label="Decrease focus time">−</button>
                      <input type="number" value={focusMinutes} min="1" max="90" onChange={(e) => updateFocus(Number(e.target.value))} />
                      <i>min</i>
                      <button onClick={() => updateFocus(focusMinutes + 5)} aria-label="Increase focus time">+</button>
                    </span>
                  </label>
                  <label className="time-setting">
                    <span><strong>Break length</strong><small>Time to reset and recharge</small></span>
                    <span className="stepper">
                      <button onClick={() => updateBreak(breakMinutes - 1)} aria-label="Decrease break time">−</button>
                      <input type="number" value={breakMinutes} min="1" max="30" onChange={(e) => updateBreak(Number(e.target.value))} />
                      <i>min</i>
                      <button onClick={() => updateBreak(breakMinutes + 1)} aria-label="Increase break time">+</button>
                    </span>
                  </label>
                  <div className="tip"><Icon name="spark" size={18} /><p><strong>Bloo's tip</strong>Shorter sessions are still real progress. Start with 15 minutes if 25 feels like too much.</p></div>
                </section>
                <button className="continue-card" onClick={() => goTo('reading')}>
                  <span className="continue-art"><Mascot /></span>
                  <span><small>CONTINUE READING</small><strong>{fileName.replace(/\.[^/.]+$/, '')}</strong><i>{progress}% complete</i></span>
                  <span className="round-arrow"><Icon name="arrow" size={19} /></span>
                </button>
              </aside>
            </div>
          </section>
        )}

        {page === 'upload' && (
          <section className="page narrow-page">
            <div className="page-intro">
              <span className="page-icon"><Icon name="upload" size={26} /></span>
              <p className="eyebrow">YOUR READING SHELF</p>
              <h1>Bring something<br /><em>worth focusing on.</em></h1>
              <p className="lead">Upload your material and we’ll turn it into a calm, distraction-free reading experience.</p>
            </div>
            <div
              className={dragging ? 'drop-zone dragging' : 'drop-zone'}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
            >
              <input id="file-upload" type="file" accept=".txt,.md,.pdf,.doc,.docx" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0])} />
              <div className="upload-illustration"><Icon name="file" size={42} /><span><Icon name="upload" size={19} /></span></div>
              <h2>Drop your reading here</h2>
              <p>or choose a file from your device</p>
              <label htmlFor="file-upload" className="primary-action">Browse files</label>
              <small>TXT, MD, PDF or DOC · up to 20 MB</small>
            </div>
            <section className="current-file">
              <div className="file-badge"><Icon name="file" size={24} /></div>
              <div><small>READY TO READ</small><strong>{fileName}</strong><span>{fileSize} · Saved in this browser</span></div>
              <span className="ready-check"><Icon name="check" size={17} /></span>
              <button onClick={() => goTo('reading')}>Open in reading zone <Icon name="arrow" size={17} /></button>
            </section>
            <div className="privacy-note"><Icon name="lock" size={16} /> Your document stays private in this browser.</div>
          </section>
        )}

        {page === 'reading' && (
          <section className="reading-page">
            <div className="reading-progress">
              <div><span>READING PROGRESS</span><strong>{progress}%</strong></div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="reader-layout">
              <aside className="reader-meta">
                <button className="back-link" onClick={() => goTo('home')}>← Back to home</button>
                <p className="eyebrow">NOW READING</p>
                <h2>{fileName.replace(/\.[^/.]+$/, '')}</h2>
                <div className="focus-mini">
                  <span><Icon name="clock" size={17} /> FOCUS SESSION</span>
                  <strong>{minutesDisplay}:{secondsDisplay}</strong>
                  <button onClick={() => setRunning(!running)}><Icon name={running ? 'pause' : 'play'} size={16} />{running ? 'Pause' : 'Resume'}</button>
                </div>
                <p className="reader-hint">Scroll inside the page to track your reading progress.</p>
              </aside>
              <article className="reading-paper" ref={readingRef} onScroll={handleScroll}>
                {readingText.split(/\n+/).filter(Boolean).map((paragraph, index) =>
                  index === 0 ? <h1 key={index}>{paragraph}</h1> :
                  paragraph.length < 42 && !paragraph.endsWith('.') ? <h2 key={index}>{paragraph}</h2> :
                  <p key={index}>{paragraph}</p>
                )}
                <div className="end-mark"><span><Icon name="check" size={18} /></span> End of reading</div>
              </article>
            </div>
            <div className="floating-mascot">
              <span>I'm reading with you.</span>
              <Mascot />
            </div>
          </section>
        )}

        {page === 'profile' && (
          <section className="page profile-page">
            <div className="profile-hero">
              <div className="avatar"><Mascot /></div>
              <div><p className="eyebrow">YOUR READING JOURNEY</p><h1>Quiet progress,<br /><em>made visible.</em></h1><p>Every focused minute is a vote for the reader you’re becoming.</p></div>
              <div className="level-card"><span>LEVEL {Math.floor(sessions / 3) + 1}</span><strong>Curious Reader</strong><div><i style={{ width: `${((sessions % 3) / 3) * 100}%` }} /></div><small>{3 - (sessions % 3)} sessions to the next level</small></div>
            </div>
            <div className="stats-grid">
              <div><span><Icon name="clock" /></span><strong>{sessions * focusMinutes}</strong><small>minutes focused</small></div>
              <div><span><Icon name="check" /></span><strong>{sessions}</strong><small>sessions finished</small></div>
              <div><span><Icon name="spark" /></span><strong>{sessions * 120}</strong><small>points earned</small></div>
            </div>
            <section className="badges-section">
              <div className="section-title"><div><p className="eyebrow">MILESTONES</p><h2>Your focus badges</h2></div><span>{[1, 5, 10].filter((n) => sessions >= n).length} of 3 unlocked</span></div>
              <div className="badges-grid">
                {[
                  { target: 1, title: 'First Step', copy: 'Complete your first focus session', symbol: '01' },
                  { target: 5, title: 'Finding Flow', copy: 'Complete five focus sessions', symbol: '05' },
                  { target: 10, title: 'Deep Focus', copy: 'Complete ten focus sessions', symbol: '10' },
                ].map((badge) => {
                  const unlocked = sessions >= badge.target
                  return <div key={badge.target} className={unlocked ? 'badge-card unlocked' : 'badge-card'}>
                    <div className="medal"><span>{unlocked ? badge.symbol : <Icon name="lock" size={23} />}</span></div>
                    <div><small>{unlocked ? 'UNLOCKED' : `${Math.max(0, badge.target - sessions)} TO GO`}</small><h3>{badge.title}</h3><p>{badge.copy}</p></div>
                    {unlocked && <span className="badge-check"><Icon name="check" size={14} /></span>}
                  </div>
                })}
              </div>
            </section>
          </section>
        )}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => goTo(item.id)}><Icon name={item.icon} /><span>{item.label}</span></button>)}
      </nav>

      {showSessionComplete && (
        <div className="modal-backdrop">
          <div className="encouragement-modal">
            <button className="modal-close" onClick={() => setShowSessionComplete(false)} aria-label="Close"><Icon name="close" /></button>
            <Mascot large />
            <p className="eyebrow">SESSION COMPLETE</p>
            <h2>Perfect! I know you<br />can made it</h2>
            <p>You stayed with it. Take a breath and enjoy your well-earned break.</p>
            <button className="primary-action" onClick={() => { setShowSessionComplete(false); switchMode('break') }}>Start my break <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      )}

      {showReadingComplete && (
        <div className="modal-backdrop">
          <div className="reading-complete-modal">
            <button className="modal-close" onClick={() => setShowReadingComplete(false)} aria-label="Close"><Icon name="close" /></button>
            <span className="completion-check"><Icon name="check" size={28} /></span>
            <p className="eyebrow">READING COMPLETE</p>
            <h2>You reached the end.</h2>
            <p>That was focused work. Here’s what you accomplished in this reading.</p>
            <div className="completion-stats">
              <div><strong>{readingDuration}</strong><span>minutes reading</span></div>
              <div><strong>100%</strong><span>material covered</span></div>
            </div>
            <button className="primary-action" onClick={() => { setShowReadingComplete(false); goTo('profile') }}>See my progress <Icon name="arrow" size={18} /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
