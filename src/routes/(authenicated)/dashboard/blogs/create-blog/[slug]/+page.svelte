<script lang="ts">
    import Editor from '$lib/components/editor/Editor.svelte';
    import EditorPanel from '$lib/components/editorPanel/EditorPanel.svelte';

    export let id: string;
</script>

<div class="flex min-h-screen w-full flex-col p-4 lg:h-screen lg:flex-row lg:p-8">
    <Editor {id} />
    <EditorPanel {id} />
</div>
