<?php get_header(); ?>
<main class="bg-black min-h-screen text-white flex items-center justify-center pt-32 pb-20">
    <div class="text-center">
        <h1 class="text-5xl font-bold mb-6">404<span class="text-[#FFC700]">.</span></h1>
        <p class="text-xl">Page not found.</p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="mt-8 inline-block px-6 py-3 bg-[#FFC700] text-black font-bold rounded-lg">Back to Home</a>
    </div>
</main>
<?php get_footer(); ?>
