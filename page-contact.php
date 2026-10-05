<?php
/* Template Name: Contact */
get_header();
?>
<main>
    <section class="min-h-screen bg-[#0a0a0a] text-white py-30 md:py-40 px-6 md:px-12 lg:px-24 antialiased flex justify-center">
        <div class="container mx-auto">
            <div class="pb-12 max-w-3xl">
                <h1 class="text-4xl md:text-[50px] font-bold mb-5 tracking-tight animate-fade-up [animation-delay:100ms] will-change-transform">Get in Touch<span class="text-[#0F67CF]">.</span></h1>
                <p class="text-gray-300 text-base md:text-[20px] animate-fade-up [animation-delay:300ms] will-change-transform leading-relaxed">
                    Whether you are exploring a new technology initiative, looking for a delivery partner, or seeking IT talent support, please complete the form below or contact us directly.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                <!-- Direct Contact Information -->
                <div class="space-y-6 lg:col-span-1">
                    <div class="bg-[#1c1c1c] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                        <h3 class="text-xl font-bold text-white mb-4">Contact Information</h3>
                        
                        <div class="flex items-start gap-4">
                            <div class="p-3 bg-[#0F67CF]/10 rounded-xl text-[#0F67CF] shrink-0 mt-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
                                <a href="mailto:hello@webimport.id" class="text-base text-white hover:text-[#0F67CF] transition-colors duration-300 font-medium">hello@webimport.id</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="p-3 bg-[#0F67CF]/10 rounded-xl text-[#0F67CF] shrink-0 mt-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                                <a href="https://wa.me/6289661209500" target="_blank" rel="noopener noreferrer" class="text-base text-white hover:text-[#0F67CF] transition-colors duration-300 font-medium">+62 896-6120-9500</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="p-3 bg-[#0F67CF]/10 rounded-xl text-[#0F67CF] shrink-0 mt-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Location</p>
                                <p class="text-base text-white font-medium">Semarang, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="lg:col-span-2">
                    <form class="space-y-8 bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-10">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="name">Your Name*</label>
                                <input class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white focus:outline-none focus:border-[#0F67CF] transition-colors" id="name" name="name" placeholder="Ex: John Doe" required="" type="text"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="role">Role*</label>
                                <input class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white focus:outline-none focus:border-[#0F67CF] transition-colors" id="role" name="role" placeholder="Ex: CEO" required="" type="text"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="company">Company Name*</label>
                                <input class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white focus:outline-none focus:border-[#0F67CF] transition-colors" id="company" name="company" placeholder="Ex: Webimport" required="" type="text"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="phone">Phone Number*</label>
                                <input class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white focus:outline-none focus:border-[#0F67CF] transition-colors" id="phone" name="phone" placeholder="Ex: +62 896-6120-9500" required="" type="tel"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="email">Work Email*</label>
                                <input class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white focus:outline-none focus:border-[#0F67CF] transition-colors" id="email" name="email" placeholder="Ex: hello@webimport.id" required="" type="email"/>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-base text-white" for="need">Your Need*</label>
                                <div class="relative">
                                    <select class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-3.5 text-white appearance-none focus:outline-none focus:border-[#0F67CF] transition-colors cursor-pointer" id="need" name="need" required="">
                                        <option disabled="" hidden="" selected="" value="">Choose Your Need</option>
                                        <option class="bg-[#1c1c1c]" value="Talent Solution">Talent Solution</option>
                                        <option class="bg-[#1c1c1c]" value="IT Digital Solution">IT Digital Solution</option>
                                        <option class="bg-[#1c1c1c]" value="General IT Need">General IT Need</option>
                                        <option class="bg-[#1c1c1c]" value="Other">Other</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-base text-white" for="message">Message*</label>
                            <textarea class="w-full bg-[#1c1c1c] border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#0F67CF] transition-colors resize-none" id="message" name="message" required="" rows="6" placeholder="Tell us about your project or inquiry..."></textarea>
                        </div>
                        <div class="pt-2">
                            <button class="relative group overflow-hidden bg-[#0F67CF] text-white font-semibold text-base px-10 py-3.5 rounded-lg shadow-xl border-2 border-[#0F67CF] transition-all duration-300 ease-out cursor-pointer hover:shadow-[0_0_20px_rgba(15,103,207,0.4)]" type="submit">
                                <div class="absolute inset-0 w-full h-full bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                                <span class="relative z-10 group-hover:text-[#0F67CF] transition-colors duration-300 ease-out">Submit Message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>
