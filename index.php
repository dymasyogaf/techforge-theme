<?php get_header(); ?>
<main class="bg-black min-h-screen text-white flex items-center justify-center">
    <div class="text-center">
        <h1><?php the_title(); ?></h1>
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <?php the_content(); ?>
        <?php endwhile; endif; ?>
    </div>
</main>
<?php get_footer(); ?>
