<script lang="ts">
    import BlogCard from '$lib/components/blogCard/BlogCard.svelte';
    import CustomButton from '$lib/components/button/CustomButton.svelte';
    import BlogPagination from '$lib/components/blogPagination/BlogPagination.svelte';

    const routeToCreateBlog = () => {
        window.location.href = 'blogs/create-blog';
    };
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
    <div class="absolute right-4 top-4 w-[400px]">
        <CustomButton text="Create Blog" isDisabled={false} onClick={() => routeToCreateBlog()} />
    </div>
    <div class="max-w-7xl">
        <BlogCard admin={true} />
    </div>
    <div class="absolute bottom-10">
        <BlogPagination />
    </div>
</div>
