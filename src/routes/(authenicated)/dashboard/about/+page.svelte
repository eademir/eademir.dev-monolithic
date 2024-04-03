<script lang="ts">
    import Editor from "$lib/components/editor/Editor.svelte";
    import EditorPanel from "$lib/components/editorPanel/EditorPanel.svelte";
</script>

<div class="flex flex-col md:flex-row p-4 md:p-14 w-full min-h-screen md:h-screen">
    <Editor id=""/>
    <EditorPanel id=""/>
</div>