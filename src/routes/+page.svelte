<script lang="ts">

	 import { login } from '$lib/auth'
    import Spinner from '$components/_skeletons/Spinner.svelte';
    import MetaTag from './utils/MetaTag.svelte';
	
	let username = '';
    let password = '';
	let authenticating = false;
	let error = '';
    async function handleSubmit(event:any) {
		authenticating = true;
	
        event.preventDefault();
        const success = await login('admin', 'admin');
        if (success) {
            // Rediriger vers le panneau admin ou une autre page après connexion
            window.location.href = '/admin';
        } else {
            alert('Erreur de connexion');
        }
    }

	const path: string = '/';
    const description: string = 'Login freewan';
    const title: string = 'Admin | Authentification';
    const subtitle: string = 'Login freewan';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<svelte:head>
	<title>Login</title>
	<meta name="description" content="lebedoo login" />
</svelte:head>
<div class="authincation min-h-[100vh] h-full flex">
	<div class="container-fluid h-full pt-0 w-full px-[12.5px]">
		<div class="row h-full">
			<div class="lg:w-1/2 w-full mx-auto self-center">
				<div class="login-form mx-auto max-w-[600px] lg:px-[50px] lg:py-0 sm:p-[25px] p-[14px]">
					<div class="text-center">
						<h3 class="title mb-2">Se connecter</h3>
						<p class="mb-4">Connectez-vous à votre compte pour commencer à utiliser Lebedoo</p>
					</div>
					<form  on:submit|preventDefault={handleSubmit}>
						<div class="mb-6">
							<label class="mb-1 text-dark">Email</label>
							<input type="email" bind:value={username} class="form-control relative text-[13px] text-body-color h-[2.813rem] border border-b-color block rounded-md py-1.5 px-3 duration-500 focus:border-primary dark:hover:border-b-color outline-none w-full"  >
						</div>
						<div class="mb-6 relative">
							<label class="mb-1 text-dark">Password</label>
							<input type="password" bind:value={password} id="dz-password" class="form-control relative text-[13px] h-[2.813rem] border border-b-color block rounded-md py-1.5 px-3 duration-500 focus:border-primary dark:hover:border-b-color outline-none w-full text-body-color" >
							<span class="show-pass eye absolute right-5 bottom-[10px] text-body-color cursor-pointer">
							
								<i class="fa fa-eye-slash"></i>
								<i class="fa fa-eye"></i>
							
							</span>
						</div>
						<div class="form-row flex justify-between mt-6 mb-2">
							<div class="mb-6">
								<div class="leading-normal block min-h-[1.3125rem] pl-[1.5em] custom-checkbox mb-4 whitespace-nowrap">
									<!-- <input type="checkbox" class="form-check-input ml-[-1.5em]" id="customCheckBox1" >
									<label class="mt-[5px] text-body-color ml-[0.3125rem]" for="customCheckBox1">Remember my preference</label> -->
								</div>
							</div>
							<div class="mb-6">
								<a href="page-forgot-password.html" class="sm:text-sm text-xs text-primary whitespace-nowrap dark:text-white">Mot de passe oublié ?</a>
							</div>
						</div>
						<div class="text-center mb-6">
							<button type="submit" class="block w-full rounded font-medium text-[15px] max-xl:text-xs leading-5 py-[0.719rem] max-xl:px-4 px-[1.563rem] max-xl:py-2.5 border border-primary text-white bg-primary hover:bg-hover-primary hover:border-hover-primary duration-300 mb-2">			
							  
								{#if authenticating}
								<div class="w-full grid grid-cols-3">
									<div>
										<Spinner/>
										
									</div>
									<div class="flex flex-col col-span-2 justify-items-start">
										<h3 class="title mt-2 dark:text-white text-white ">Se connecter</h3>
									</div>
							  </div>
									{:else}

									<h3 class="title mt-2 dark:text-white text-white ">Se connecter</h3>
									{/if}
								
								
							</button>
						</div>
						<h6 class="login-title text-center relative mb-12 flex center z-[1] items-center"><span><!-- Or continue with --></span></h6>
						
						<div class="mb-4">
							<ul class="flex self-center justify-center">
								<!-- <li><a target="_blank" href="https://www.facebook.com/" class="fab fa-facebook-f w-10 h-10 leading-[2.5rem] rounded-full text-white text-center bg-facebook"></a></li>
								<li><a target="_blank" href="https://www.google.com/" class="fab fa-google-plus-g w-10 h-10 leading-[2.5rem] rounded-full text-white text-center bg-google-plus mx-2"></a></li>
								<li><a target="_blank" href="https://www.linkedin.com/" class="fab fa-linkedin-in w-10 h-10 leading-[2.5rem] rounded-full text-white text-center bg-linkedin mr-2"></a></li>
								<li><a target="_blank" href="https://twitter.com/" class="fab fa-twitter w-10 h-10 leading-[2.5rem] rounded-full text-white text-center bg-twitter"></a></li> -->
							</ul>
						</div>
						<!-- <p class="text-center mb-2">Not registered?  
							<a class="text-sm text-primary dark:text-white" href="page-register.html">Register</a>
						</p> -->
					</form>
				</div>
			</div>
			<div class="lg:w-1/2 w-full">
				<div class="pages-left h-full bg-white dark:bg-[#242424]">
					<div class="login-content text-center lg:pt-[70px] lg:pl-[70px] sm:pt-10 sm:pl-[51px] pt-[14px] pl-[14px]">
						<a href="#"><img src="/lebedoo_inline_logo_svg.svg" class="mb-4 inline-block dark:hidden logo-dark w-[600px]" alt=""></a>
						<a href="#"><img src="/lebedoo_inline_logo_svg.svg" class="mb-4 hidden dark:inline-block logo-light w-[600px]" alt=""></a>
						
						<p class="mb-4 xl:text-xl sm:text-base text-sm xl:leading-[1.5] text-black mx-auto max-w-[500px] dark:text-white"><!-- CRM dashboard uses line charts to visualize customer-related metrics and trends over time. --></p>
					</div>
					<div class="login-media text-center sm:mt-20 mt-5">
						<img src="assets/images/login.png" alt="" class="max-lg:w-[60%] w-[70%] inline-block">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
