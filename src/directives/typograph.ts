import type { Directive } from 'vue'

/**
 * Типограф: не оставляет короткие предлоги, союзы и частицы в конце строки —
 * после них ставится неразрывный пробел, и слово переносится вместе со следующим.
 */
const SHORT_WORDS = [
  // предлоги
  'в', 'во', 'без', 'до', 'для', 'за', 'из', 'изо', 'к', 'ко', 'на', 'над', 'о', 'об', 'обо',
  'от', 'ото', 'по', 'под', 'при', 'про', 'с', 'со', 'у', 'через',
  // союзы и частицы
  'а', 'и', 'но', 'да', 'или', 'ли', 'не', 'ни', 'что', 'как',
]

const NBSP = ' '
const SHORT_WORD_RE = new RegExp(
  `(?<=^|[\\s(«"„])(${SHORT_WORDS.join('|')})\\s+(?=\\S)`,
  'giu',
)

export function typograph(text: string): string {
  return text.replace(SHORT_WORD_RE, `$1${NBSP}`)
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
