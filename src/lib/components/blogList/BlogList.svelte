<script>
    import BlogCard from '$lib/components/blogCard/BlogCard.svelte';
    import BlogPagination from '$lib/components/blogPagination/BlogPagination.svelte';
</script>

<div class="h-full overflow-y-auto p-4">
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
    <BlogCard />
</div>
<div class="mt-4 h-fit">
    <BlogPagination />
</div>
