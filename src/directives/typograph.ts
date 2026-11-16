import type { Directive } from 'vue'

/**
 * Типограф — неразрывные пробелы, чтобы в конце строки ничего не «висело»:
 * - короткие предлоги, союзы и частицы переносятся вместе со следующим словом;
 * - тире не начинает строку — держится за предыдущее слово;
 * - число не отрывается от следующего слова («12 интервью», «3 года»);
 * - частицы ли / же / бы держатся за предыдущее слово.
 */
const SHORT_WORDS = [
  // предлоги
  'в', 'во', 'без', 'до', 'для', 'за', 'из', 'изо', 'к', 'ко', 'на', 'над', 'о', 'об', 'обо',
  'от', 'ото', 'по', 'под', 'при', 'про', 'с', 'со', 'у', 'через', 'перед', 'между', 'после',
  // союзы и частицы
  'а', 'и', 'но', 'да', 'или', 'ли', 'не', 'ни', 'что', 'как', 'то', 'уже', 'ещё', 'еще',
]

const NBSP = ' '
const SHORT_WORD_RE = new RegExp(
  `(?<=^|[\\s(«"„/])(${SHORT_WORDS.join('|')})\\s+(?=\\S)`,
  'giu',
)
// Обычные пробелы (не неразрывные) перед тире
const DASH_RE = /(?<=\S)[ \t\n\r]+(—|–)(?=\s)/gu
// Пробел после числа (в т.ч. «−40%», «120K», «4,1»), если дальше слово
const NUMBER_RE = /(?<=(?:^|\s)[−+×~]?\d[\d,.]*(?:%|K)?)[ \t\n\r]+(?=[^\s\d—–])/gu
const PARTICLE_RE = /(?<=\S)[ \t\n\r]+(ли|же|бы)(?=[\s,.!?:;]|$)/gu

export function typograph(text: string): string {
  return text
    .replace(SHORT_WORD_RE, `$1${NBSP}`)
    .replace(DASH_RE, `${NBSP}$1`)
    .replace(NUMBER_RE, NBSP)
    .replace(PARTICLE_RE, `${NBSP}$1`)
}

function processTree(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const value = node.nodeValue
    if (!value) continue
    const next = typograph(value)
    // Меняем только при отличии — иначе MutationObserver зациклится
    if (next !== value) node.nodeValue = next
  }
}

const observers = new WeakMap<HTMLElement, MutationObserver>()

/**
 * Директива v-typograph: обрабатывает весь текст внутри элемента и следит
 * за изменениями (смена страницы, обновление данных).
 */
export const vTypograph: Directive<HTMLElement> = {
  mounted(el) {
    processTree(el)
    const observer = new MutationObserver(() => processTree(el))
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
