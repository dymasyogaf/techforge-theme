<!DOCTYPE html>
<html class="inter_5901b7c6-module__ec5Qua__variable" <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>"/>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<title><?php wp_title('|', true, 'right'); ?> TechForge</title>
<link href="<?php echo esc_url(get_template_directory_uri() . '/assets/images/icon.png?v=5'); ?>" rel="icon" sizes="180x180" type="image/png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<style>body.admin-bar nav.fixed { top: 32px !important; } @media screen and (max-width: 782px) { body.admin-bar nav.fixed { top: 46px !important; } }</style>
<?php wp_head(); ?>
</head>
<body <?php body_class("font-sans antialiased"); ?>>
<?php wp_body_open(); ?>
<nav class="fixed w-full top-0 z-[999] h-18 transition-all duration-300 bg-transparent">
    <div class="container mx-auto flex justify-between items-center h-full px-4 md:px-0 text-white">
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <img alt="TechForge Logo" class="w-auto h-12 md:h-17 object-contain" height="68" loading="eager" fetchpriority="high" decoding="async" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/logo.png?v=3'); ?>" style="color:transparent" width="175"/>
        </a>
        <div class="hidden md:flex space-x-20">
            <a class="transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/about/')); ?>">About Us</a>
            <a class="transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/services/')); ?>">Services</a>
            <a class="transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/industries/')); ?>">Industries</a>
            <a class="transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/community/')); ?>">Community</a>
            <a class="transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/contact/')); ?>">Contact Us</a>
        </div>
        <div class="md:hidden flex items-center z-50">
            <button aria-label="Toggle menu" class="text-white focus:outline-none relative z-50">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
            </button>
        </div>
    </div>
</nav>
<div class="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 md:hidden opacity-0 invisible"></div>
<div class="fixed top-0 right-0 h-full w-64 bg-black2 shadow-2xl flex flex-col pt-24 px-8 space-y-6 transform transition-transform duration-300 ease-in-out z-40 md:hidden translate-x-full">
    <a class="text-lg transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/about/')); ?>">About Us</a>
    <a class="text-lg transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/services/')); ?>">Services</a>
    <a class="text-lg transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/industries/')); ?>">Industries</a>
    <a class="text-lg transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/community/')); ?>">Community</a>
    <a class="text-lg transition-colors duration-300 text-white hover:text-[#0F67CF]" href="<?php echo esc_url(home_url('/contact/')); ?>">Contact Us</a>
</div>