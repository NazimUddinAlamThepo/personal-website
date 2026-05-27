import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  BookOpen, Calendar, Lightbulb, Target, Zap,
  ChevronDown, ChevronUp, X, Plus, Hash, Send,
  Pencil, Globe, Flame, AlertCircle, Loader,
} from 'lucide-react'
import { personal } from '../data/portfolioData'
import { 
  fetchAllLearningPosts, 
  createLearningPost,
  deleteLearningPost,
  updateLearningPost,
  togglePostPin 
} from '../services/learningApi'

// ── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'ML / AI', 'Frontend', 'DSA', 'Tools', 'Backend']

const CATEGORY_COLORS = {
  'ML / AI':  'bg-amber-100  text-amber-700  border-amber-200  dark:bg-amber-900/20  dark:text-amber-400  dark:border-amber-700/30',
  'Frontend': 'bg-blue-100   text-blue-700   border-blue-200   dark:bg-blue-900/20   dark:text-blue-400   dark:border-blue-700/30',
  'DSA':      'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-700/30',
  'Tools':    'bg-green-100  text-green-700  border-green-200  dark:bg-green-900/20  dark:text-green-400  dark:border-green-700/30',
  'Backend':  'bg-rose-100   text-rose-700   border-rose-200   dark:bg-rose-900/20   dark:text-rose-400   dark:border-rose-700/30',
}

const CATEGORY_GRADIENT = {
  'ML / AI':  'from-amber-400  to-orange-400',
  'Frontend': 'from-blue-400   to-cyan-400',
  'DSA':      'from-purple-400 to-pink-400',
  'Tools':    'from-green-400  to-teal-400',
  'Backend':  'from-rose-400   to-pink-400',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysAgo(str) {
  const diff = Math.floor((Date.now() - new Date(str)) / 86_400_000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7)  return `${diff}d ago`
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Markdown-lite renderer: **bold**, *italic*, `code`
function RichText({ text }) {
  return (
    <div className="space-y-2">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/)
        return (
          <p key={i} className="text-sm leading-relaxed text-[var(--color-muted)]">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**'))
                return <strong key={j} className="font-semibold text-[var(--color-text)]">{part.slice(2, -2)}</strong>
              if (part.startsWith('*') && part.endsWith('*'))
                return <em key={j}>{part.slice(1, -1)}</em>
              if (part.startsWith('`') && part.endsWith('`'))
                return (
                  <code key={j} className="px-1.5 py-0.5 rounded text-xs font-mono
                                           bg-navy-50 dark:bg-navy-900/40
                                           text-navy-500 dark:text-navy-300
                                           border border-navy-100 dark:border-navy-800">
                    {part.slice(1, -1)}
                  </code>
                )
              return part
            })}
          </p>
        )
      })}
    </div>
  )
}

// ── PostCard  (LinkedIn-style) ────────────────────────────────────────────────
function PostCard({ post, index, onDelete, onPin }) {
  const [expanded, setExpanded] = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const lines   = post.content.trim().split('\n')
  const preview = lines.slice(0, 5).join('\n')
  const hasMore = lines.length > 5

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card feed-card rounded-2xl overflow-hidden"
    >
      {/* Category accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${CATEGORY_GRADIENT[post.category] ?? 'from-navy-400 to-forest-400'}`} />

      <div className="p-5 sm:p-6">

        {/* ── Post header ── */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-400 to-forest-500
                            flex items-center justify-center text-white font-bold text-base shadow-md">
              {personal.shortName.charAt(0)}
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-forest-400
                             border-2 border-white dark:border-[var(--color-bg)]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-[var(--color-text)] leading-none">
                {personal.shortName}
              </span>
              {post.pinned && (
                <span className="text-[10px] px-2 py-0.5 rounded-md
                                 bg-amber-100 dark:bg-amber-900/30
                                 text-amber-600 dark:text-amber-400
                                 border border-amber-200 dark:border-amber-700/30 font-medium">
                  📌 Pinned
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-0.5 leading-none">
              {personal.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-[var(--color-muted)] flex items-center gap-1 opacity-80">
                <Calendar size={10} /> {daysAgo(post.date)}
              </span>
              <span className="opacity-40 text-[10px]">·</span>
              <Globe size={10} className="text-[var(--color-muted)] opacity-60" />
            </div>
          </div>

          {/* Category badge */}
          <span className={`flex-shrink-0 inline-flex items-center gap-1 text-[11px] px-2.5 py-1
                           rounded-full border font-medium ${CATEGORY_COLORS[post.category] ?? ''}`}>
            <span className="hidden sm:inline">{post.category}</span>
          </span>
        </div>

        {/* ── Title ── */}
        <h3 className="font-semibold text-[15px] text-[var(--color-text)] mb-3 leading-snug">
          {post.title}
        </h3>

        {/* ── Content ── */}
        <div className="mb-3">
          <RichText text={expanded ? post.content : preview} />
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs font-semibold mb-4
                       text-navy-500 dark:text-navy-300 hover:text-forest-500 dark:hover:text-forest-400 transition-colors"
          >
            {expanded
              ? <><ChevronUp size={13} /> Show less</>
              : <><ChevronDown size={13} /> …see more</>}
          </button>
        )}

        {/* ── Tags ── */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(t => (
              <span key={t}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-mono
                           bg-navy-50 dark:bg-navy-900/30 text-navy-500 dark:text-navy-300
                           border border-navy-100 dark:border-navy-800 hover:bg-navy-100 dark:hover:bg-navy-800/40
                           transition-colors cursor-default">
                <Hash size={9} />{t}
              </span>
            ))}
          </div>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/8">
          <motion.button
            onClick={() => onPin(post._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
              post.pinned
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'text-[var(--color-muted)] hover:bg-black/5 dark:hover:bg-white/10'
            }`}
          >
            <Flame size={12} /> {post.pinned ? 'Pinned' : 'Pin'}
          </motion.button>
          <motion.button
            onClick={() => onDelete(post._id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-[var(--color-muted)] hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all ml-auto"
          >
            <X size={12} /> Delete
          </motion.button>
        </div>

      </div>
    </motion.article>
  )
}

// ── New Post Modal ────────────────────────────────────────────────────────────
function NewPostModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    category: 'ML / AI', title: '', content: '', tags: '',
  })
  const textareaRef = useRef(null)

  useEffect(() => { textareaRef.current?.focus() }, [])

  const handle = () => {
    if (!form.title.trim() || !form.content.trim()) return
    const newPost = {
      title: form.title,
      content: form.content,
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    }
    onSubmit(newPost)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-400 to-forest-500
                            flex items-center justify-center text-white text-sm font-bold shadow">
              {personal.shortName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm text-[var(--color-text)] leading-none">{personal.shortName}</p>
              <p className="text-[11px] text-[var(--color-muted)] mt-0.5 flex items-center gap-1">
                <Globe size={9} /> Anyone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       text-[var(--color-muted)] hover:bg-black/8 dark:hover:bg-white/10 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          {/* Category */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <motion.button
                  key={c}
                  onClick={() => setForm(f => ({ ...f, category: c }))}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    form.category === c
                      ? 'bg-navy-500 dark:bg-navy-400 text-white border-transparent shadow'
                      : 'border-navy-200 dark:border-navy-700 text-[var(--color-muted)] hover:border-navy-400'
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Title *
            </p>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="What did you learn? Give it a title…"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-medium
                         bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10
                         text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50
                         focus:outline-none focus:border-navy-400 transition-colors"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Content * — <span className="normal-case font-normal">**bold**, *italic*, `code` supported</span>
            </p>
            <textarea
              ref={textareaRef}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="Share what you learned today — insights, code patterns, breakthroughs…"
              rows={6}
              className="w-full px-4 py-3 rounded-xl text-sm font-mono leading-relaxed resize-none
                         bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10
                         text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50
                         focus:outline-none focus:border-navy-400 transition-colors"
            />
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
              Tags <span className="normal-case font-normal opacity-70">(comma separated)</span>
            </p>
            <input
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              placeholder="React, Hooks, Performance"
              className="w-full px-4 py-2.5 rounded-xl text-sm
                         bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10
                         text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50
                         focus:outline-none focus:border-navy-400 transition-colors"
            />
          </div>

          <motion.button
            onClick={handle}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            disabled={!form.title.trim() || !form.content.trim()}
            className="w-full py-3.5 rounded-xl text-sm font-semibold shadow-lg
                       bg-navy-500 dark:bg-navy-400 text-white hover:bg-forest-500
                       transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            <Send size={14} /> Post to Learning Log
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Write-a-post prompt ───────────────────────────────────────────────────────
function WritePrompt({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-4 mb-5 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-400 to-forest-500
                      flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
        {personal.shortName.charAt(0)}
      </div>
      <button
        onClick={onOpen}
        className="flex-1 px-4 py-2.5 rounded-full border border-navy-200/60 dark:border-navy-700/60
                   text-sm text-[var(--color-muted)]/70 text-left
                   hover:border-navy-400 dark:hover:border-navy-400
                   hover:bg-navy-50/50 dark:hover:bg-navy-800/30
                   transition-all duration-200"
      >
        Share what you're learning today…
      </button>
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.08, y: -1 }}
        whileTap={{ scale: 0.94 }}
        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold
                   bg-navy-500 dark:bg-navy-400 text-white shadow hover:bg-forest-500 transition-colors duration-300"
      >
        <Pencil size={13} /> Write
      </motion.button>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function LearningLog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [showModal, setModal] = useState(false)

  // Fetch posts from backend
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAllLearningPosts()
        setPosts(data || [])
      } catch (err) {
        console.error('Failed to load posts:', err)
        setError('Failed to load learning posts. Please try again.')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const handleReact = useCallback((postId, emoji, delta) => {
    // Removed - reactions feature is no longer used
  }, [])

  const handleCreatePost = useCallback(async (newPostData) => {
    try {
      const createdPost = await createLearningPost({
        title: newPostData.title,
        content: newPostData.content,
        category: newPostData.category,
        tags: newPostData.tags,
        date: new Date(),
        pinned: false
      })
      setPosts(prev => [createdPost, ...prev])
    } catch (err) {
      console.error('Failed to create post:', err)
      alert('Failed to create post. Please try again.')
    }
  }, [])

  const handleDeletePost = useCallback(async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      await deleteLearningPost(postId)
      setPosts(prev => prev.filter(p => p._id !== postId))
    } catch (err) {
      console.error('Failed to delete post:', err)
      alert('Failed to delete post. Please try again.')
    }
  }, [])

  const handleTogglePin = useCallback(async (postId) => {
    try {
      const updated = await togglePostPin(postId)
      setPosts(prev => prev.map(p => p._id === postId ? updated : p))
    } catch (err) {
      console.error('Failed to toggle pin:', err)
    }
  }, [])

  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter)

  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="learning" className="section-pad relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px
                        bg-gradient-to-r from-transparent via-navy-200/30 dark:via-navy-700/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.04] bg-amber-400 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.04] bg-navy-500 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">

        {/* ── Section header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="tag text-xs tracking-widest uppercase mb-4 inline-block"
          >
            Daily Growth
          </motion.span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold mb-4">
            <span className="text-gradient">Learning</span>
            <span className="text-[var(--color-text)]"> Log</span>
          </h2>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto text-base leading-relaxed">
            Documenting what I learn every day — ML breakthroughs, frontend patterns,
            algorithms, and engineering insights. Shared openly.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {[
            { label: 'Total Entries', value: posts.length,                                   icon: BookOpen, color: 'text-navy-500 dark:text-navy-300'   },
            { label: 'ML / AI',       value: posts.filter(p=>p.category==='ML / AI').length,  icon: Lightbulb,color: 'text-amber-500 dark:text-amber-400'  },
            { label: 'Frontend',      value: posts.filter(p=>p.category==='Frontend').length, icon: Zap,      color: 'text-blue-500 dark:text-blue-400'    },
            { label: 'DSA',           value: posts.filter(p=>p.category==='DSA').length,      icon: Target,   color: 'text-purple-500 dark:text-purple-400'},
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.07 }}
              whileHover={{ y: -2, scale: 1.03 }}
              className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl cursor-default"
            >
              <Icon size={13} className={color} />
              <span className="text-sm font-bold text-[var(--color-text)]">{value}</span>
              <span className="text-xs text-[var(--color-muted)]">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Centered feed column ── */}
        <div className="max-w-2xl mx-auto">

          {/* Write a post */}
          {inView && <WritePrompt onOpen={() => setModal(true)} />}

          {/* Category filter + new button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-between gap-3 mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    filter === cat
                      ? 'bg-navy-500 dark:bg-navy-400 text-white border-transparent shadow-md shadow-navy-500/20'
                      : 'border-navy-200/50 dark:border-navy-700/50 text-[var(--color-muted)] hover:border-navy-400 hover:text-[var(--color-text)]'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="ml-1 opacity-60 tabular-nums">
                      {posts.filter(p => p.category === cat).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => setModal(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                         border border-navy-500/30 dark:border-navy-400/30
                         text-navy-500 dark:text-navy-300
                         hover:bg-navy-500 hover:text-white dark:hover:bg-navy-400
                         transition-all duration-300 flex-shrink-0"
            >
              <Plus size={13} /> New Entry
            </motion.button>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3"
            >
              <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Feed */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div key="loading" className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader size={32} className="text-navy-500 dark:text-navy-300" />
                </motion.div>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <BookOpen size={48} className="mx-auto mb-4 text-[var(--color-muted)]/30" />
                <p className="text-[var(--color-muted)]">No learning posts yet.</p>
                <p className="text-sm text-[var(--color-muted)]/70 mt-2">Click "Write" to share your first learning!</p>
              </motion.div>
            ) : (
              <motion.div
                key={`posts-${filter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {filtered.map((post, i) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    index={i}
                    onDelete={handleDeletePost}
                    onPin={handleTogglePin}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <NewPostModal
            onClose={() => setModal(false)}
            onSubmit={async (post) => {
              await handleCreatePost(post)
              setFilter('All')
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
