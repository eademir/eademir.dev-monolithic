<script lang="ts">
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/stackoverflow-dark.min.css';
    import DOMPurify from 'isomorphic-dompurify';

    export const id: string = '';

    let content = `
# Marked in Node.js

Rendered by **marked**.
# Hello World

<br>
deneme
<br>

 \`\`\`javascript
let val = 0;
\`\`\`

a
\`\`\`java
import java.util.Arrays;
import java.util.Random;


public class QuickSort {
\tpublic void quickSort(int[] A) {
\t\tquickSort(A, 0, A.length-1);
\t}
\tprivate void quickSort(int[] A, int low, int high) {
\t\tif (low < high+1) {
\t\t\tint p = partition(A, low, high);
\t\t\tquickSort(A, low, p-1);
\t\t\tquickSort(A, p+1, high);
\t\t}
\t}
\tprivate void swap(int[] A, int index1, int index2) {
\t\tint temp = A[index1];
\t\tA[index1] = A[index2];
\t\tA[index2] = temp;\t\t
\t}
\t// returns random pivot index between low and high inclusive.
\tprivate int getPivot(int low, int high) {
\t\tRandom rand = new Random();
\t\treturn rand.nextInt((high - low) + 1) + low;
\t}
\t// moves all n < pivot to left of pivot and all n > pivot
\t// to right of pivot, then returns pivot index.
\tprivate int partition(int[] A, int low, int high) {
\t\tswap(A, low, getPivot(low, high));
\t\tint border = low + 1;
\t\tfor (int i = border; i <= high; i++) {
\t\t\tif (A[i] < A[low]) {
\t\t\t\tswap(A, i, border++);
\t\t\t}
\t\t}
\t\tswap(A, low, border-1);
\t\treturn border-1;
\t}

\tpublic static void main(String[] args) {
\t\tQuickSort qs = new QuickSort();
\t\tint[] A = {9, 0, 1, 3, 4, 5, 2, 9, 8, 7, 6, 5, 9, 1, 0, 9};
\t\tSystem.out.println(Arrays.toString(A));
\t\tqs.quickSort(A);
\t\tSystem.out.println(Arrays.toString(A));
\t}
}
\`\`\`
    `;

    let editor: HTMLTextAreaElement;
    let reader: HTMLDivElement;
    let html: string = '';
    let ignoreScroll = false;

    const scroller = (element1: HTMLElement, element2: HTMLElement) => {
        let ignore = ignoreScroll;
        ignoreScroll = false;
        if (ignore) return;

        ignoreScroll = true;
        const multiplier = element1.scrollTop / (element1.scrollHeight - element1.clientHeight);
        element2.scrollTop = multiplier * (element2.scrollHeight - element1.clientHeight);
    };

    const setHtml = () => {
        html = marked(DOMPurify.sanitize(marked(content) as string, {})) as string;
    };

    onMount(() => {
        setHtml();
    });

    marked.use({
        renderer: {
            code(code, language) {
                const lang = () => {
                    if (!language) {
                        return 'plaintext';
                    }
                    if (hljs.getLanguage(language)) {
                        return language;
                    }
                    return 'plaintext';
                };
                let validLanguage = lang();
                return `<pre><code class="hljs ${validLanguage}">${hljs.highlight(code, { language: validLanguage }, true).value}</code></pre>`;
            },
        },
        breaks: true,
        gfm: true,
    });
</script>

<div class="flex w-full flex-col gap-2 lg:flex-row">
    <div class="h-full w-full gap-2">
        <textarea
            bind:value={content}
            bind:this={editor}
            on:scroll={() => {
                scroller(editor, reader);
            }}
            on:input={() => {
                setHtml();
                scroller(editor, reader);
            }}
            class="border-gray-400 m-2 h-full min-h-[400px] w-full rounded-lg border bg-surface-100 p-2 text-surface-800 dark:bg-surface-800 dark:text-surface-200"
        />
    </div>
    <div
        class=" m-2 h-full min-h-[400px] w-full overflow-y-auto rounded-lg border bg-surface-100 p-5 dark:border-surface-200 dark:bg-surface-900"
        bind:this={reader}
        on:scroll={() => scroller(reader, editor)}
    >
        <div
            class="prose-pre:bg-black prose w-full dark:prose-invert prose-a:text-tertiary-600 prose-code:w-full prose-pre:w-full prose-pre:overflow-x-auto prose-pre:rounded-lg"
        >
            {@html html}
        </div>
    </div>
</div>
