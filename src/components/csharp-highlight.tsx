import type React from 'react'

const KEYWORDS = new Set([
  'abstract','as','base','bool','break','byte','case','catch','char','checked','class','const','continue','decimal','default',
  'delegate','do','double','else','enum','event','explicit','extern','false','finally','fixed','float','for','foreach','goto',
  'if','implicit','in','int','interface','internal','is','lock','long','namespace','new','null','object','operator','out',
  'override','params','private','protected','public','readonly','ref','return','sbyte','sealed','short','sizeof','static',
  'string','struct','switch','this','throw','true','try','typeof','uint','ulong','unchecked','ushort','using','var','virtual',
  'void','while','yield','async','await','record','when','get','set','dynamic','global',
])

const TYPES = new Set([
  'Console','Convert','String','Math','List','Dictionary','HashSet','Array','ArrayList','Func','Action','Predicate',
  'DateTime','Exception','Regex','StringBuilder','LinkedList','SortedList','KeyValuePair','Enumerable','Nullable','Program',
])

/** Tokenizer C# gọn nhẹ — đủ cho slide, không kéo thêm thư viện highlight vào bundle. */
const TOKEN = new RegExp(
  [
    '(\\/\\/[^\\n]*)',                       // 1 comment dòng
    '(\\/\\*[\\s\\S]*?\\*\\/)',              // 2 comment khối
    '(\\$?@?"(?:[^"\\\\\\n]|\\\\.|"")*")',   // 3 chuỗi
    "('(?:[^'\\\\]|\\\\.)')",                // 4 ký tự
    '\\b(\\d+(?:\\.\\d+)?[fmdLu]?)\\b',      // 5 số
    '([A-Za-z_][A-Za-z0-9_]*)',              // 6 định danh
  ].join('|'),
  'g',
)

const SQL_KEYWORDS = new Set(
  `select from where and or not in is null as insert into values update set delete create table alter drop database use
   primary key foreign references constraint identity default check unique index view procedure function returns return
   begin end if else while declare exec execute output inner left right full outer join on group by having order asc desc
   top offset fetch next rows only distinct count sum avg min max like between exists union all case when then cast convert
   transaction commit rollback save try catch print go with for json path openjson cursor open close deallocate into
   nvarchar varchar int bigint decimal datetime datetime2 date bit money text max getdate newid`
    .split(/\s+/)
    .filter(Boolean),
)

const WEB_KEYWORDS = new Set([
  'page','code','inject','using','model','layout','if','else','foreach','for','bind','onclick','onchange','functions','implements',
  'inherits','attribute','namespace','typeparam','key','ref','rendermode','attributes','var','new','async','await','return','void',
  'string','int','bool','null','true','false','private','public','class','override','protected','Task','List','this','is','in',
])

/** Tô màu nhẹ cho các ngôn ngữ ngoài C#: tag/attribute cho HTML & Razor, từ khoá cho SQL, key cho JSON/YAML, lệnh cho bash. */
function highlightOther(code: string, lang: string) {
  const out: React.ReactNode[] = []
  let k = 0
  const push = (txt: string, cls?: string) => out.push(cls ? <span key={k++} className={cls}>{txt}</span> : txt)
  if (lang === 'sql') {
    const re = /(--[^\n]*|\/\*[\s\S]*?\*\/)|(N?'(?:[^']|'')*')|\b(\d+(?:\.\d+)?)\b|(@@?[A-Za-z_][A-Za-z0-9_]*)|([A-Za-z_][A-Za-z0-9_]*)/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) push(code.slice(last, m.index))
      const [full, c, str, num, v, id] = m
      if (c) push(full, 'text-white/32 italic')
      else if (str) push(full, 'text-mint-400')
      else if (num) push(full, 'text-amber-300')
      else if (v) push(full, 'text-accent-400')
      else if (id && SQL_KEYWORDS.has(id.toLowerCase())) push(full, 'text-brand-400 font-medium')
      else push(full)
      last = m.index + full.length
    }
    if (last < code.length) push(code.slice(last))
    return out
  }
  if (lang === 'html' || lang === 'razor' || lang === 'xml') {
    const re = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w-]*)|(\/?>)|([A-Za-z-:@]+)(=)("[^"]*"|'[^']*')|(@\*[\s\S]*?\*@)|(@[A-Za-z_][\w.]*|@\(|@\{)|("(?:[^"\\]|\\.)*")|([A-Za-z_][A-Za-z0-9_]*)/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) push(code.slice(last, m.index))
      const [full, cm, tag, close, attr, eq, val, rcm, razor, str, id] = m
      if (cm || rcm) push(full, 'text-white/32 italic')
      else if (tag) push(full, 'text-rose-300')
      else if (close) push(full, 'text-rose-300')
      else if (attr) { push(attr, 'text-amber-300'); push(eq); push(val, 'text-mint-400') }
      else if (razor) push(full, 'text-brand-400 font-semibold')
      else if (str) push(full, 'text-mint-400')
      else if (id && lang === 'razor' && WEB_KEYWORDS.has(id)) push(full, 'text-brand-400 font-medium')
      else push(full)
      last = m.index + full.length
    }
    if (last < code.length) push(code.slice(last))
    return out
  }
  if (lang === 'css') {
    const re = /(\/\*[\s\S]*?\*\/)|([.#]?[A-Za-z][\w-]*(?=\s*\{)|@[a-z-]+)|([a-z-]+)(\s*:)|(#[0-9a-fA-F]{3,8}|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|fr|s|ms)?\b)/g
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) push(code.slice(last, m.index))
      const [full, cm, sel, prop, colon, num] = m
      if (cm) push(full, 'text-white/32 italic')
      else if (sel) push(full, 'text-rose-300')
      else if (prop) { push(prop, 'text-accent-400'); push(colon) }
      else if (num) push(full, 'text-amber-300')
      else push(full)
      last = m.index + full.length
    }
    if (last < code.length) push(code.slice(last))
    return out
  }
  if (lang === 'json' || lang === 'yaml') {
    const re = /(#[^\n]*)|("[^"\n]*")(\s*:)|("[^"\n]*")|\b(true|false|null|\d+(?:\.\d+)?)\b|^(\s*[A-Za-z_][\w-]*)(:)/gm
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) push(code.slice(last, m.index))
      const [full, cm, key, colon, str, lit, ykey, ycolon] = m
      if (cm) push(full, 'text-white/32 italic')
      else if (key) { push(key, 'text-accent-400'); push(colon) }
      else if (str) push(full, 'text-mint-400')
      else if (lit) push(full, 'text-amber-300')
      else if (ykey) { push(ykey, 'text-accent-400'); push(ycolon) }
      else push(full)
      last = m.index + full.length
    }
    if (last < code.length) push(code.slice(last))
    return out
  }
  if (lang === 'bash' || lang === 'sh' || lang === 'dockerfile') {
    const re = /(#[^\n]*)|^(\s*)(dotnet|docker|docker-compose|git|npm|cd|ls|mkdir|rm|cp|mv|cat|curl|wsl|FROM|WORKDIR|COPY|RUN|EXPOSE|CMD|ENTRYPOINT|ENV|ARG)\b|(--?[A-Za-z][\w-]*)|("[^"]*"|'[^']*')/gm
    let last = 0, m: RegExpExecArray | null
    while ((m = re.exec(code)) !== null) {
      if (m.index > last) push(code.slice(last, m.index))
      const [full, cm, ws, cmd, flag, str] = m
      if (cm) push(full, 'text-white/32 italic')
      else if (cmd) { push(ws); push(cmd, 'text-brand-400 font-semibold') }
      else if (flag) push(full, 'text-amber-300')
      else if (str) push(full, 'text-mint-400')
      else push(full)
      last = m.index + full.length
    }
    if (last < code.length) push(code.slice(last))
    return out
  }
  return [code]
}

export function highlight(code: string, lang?: string) {
  if (lang && !['csharp', 'cs', 'js', 'javascript', 'ts'].includes(lang)) return highlightOther(code, lang)
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  TOKEN.lastIndex = 0
  let k = 0
  while ((m = TOKEN.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const [full, lineC, blockC, str, ch, num, ident] = m
    let cls = ''
    if (lineC || blockC) cls = 'text-white/32 italic'
    else if (str) cls = 'text-mint-400'
    else if (ch) cls = 'text-mint-400'
    else if (num) cls = 'text-amber-300'
    else if (ident) {
      if (KEYWORDS.has(ident)) cls = 'text-brand-400 font-medium'
      else if (TYPES.has(ident)) cls = 'text-accent-400'
      else if (code[m.index + full.length] === '(') cls = 'text-sky-200'
    }
    out.push(cls ? <span key={k++} className={cls}>{full}</span> : full)
    last = m.index + full.length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}
