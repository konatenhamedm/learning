
<script lang="ts">
    import { onMount } from 'svelte';
    import Entete from "$components/_includes/Entete.svelte";
	import { getAuthCookie } from '$lib/auth'
    import type { User } from '../../types';
    import MetaTag from '../utils/MetaTag.svelte';
    import InputSelect from '$components/inputs/InputSelect.svelte';
    import InputDate from '$components/inputs/InputDate.svelte';
    
  import { Datepicker } from 'flowbite-svelte';
    /* import { label } from 'aws-amplify'; */

   export let user: User;

   let data = [
    {
        id:1,
        libelle:'CI',
       
    },
    {
        id:2,
        libelle:'Benin',
       
    },
    {
        id:3,
        libelle:'Inde',
       
    },
    {
        id:4,
        libelle:'Chine',
       
    }
   ]


    //console.log(user);
// Fonction pour récupérer un cookie spécifique

onMount(async () => {
user = getAuthCookie();

});


let imageUrl = "https://w3crm.dexignzone.com/xhtml/page-error-404.html";
    let imagePreviewStyle = `background-image: url(${imageUrl})`;

    function readURL(event) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreviewStyle = `background-image: url(${e.target.result})`;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function removeImage() {
        imagePreviewStyle = `background-image: url(${imageUrl})`;
    }

    const path: string = '/admin';
    const description: string = 'Admin freewan';
    const title: string = 'Admin | Accueil';
    const subtitle: string = 'Accueil freewan';
</script>

<MetaTag {path} {description} {title} {subtitle} />


<Entete libelle="Accueil" lien="dd"/>
<div class="container-fluid">

    <div class="cm-content-body form excerpt border-t border-[#eee] dark:border-[#444444] content">
        <div class="card-body sm:p-5 p-4">
            <div class="avatar-upload flex items-center">
                <div class="relative ">
                    <div class="avatar-preview border border-b-color p-2 mb-2.5 rounded-md">
                        <div class="block w-full h-[9.5rem] bg-cover bg-no-repeat bg-center" id="imagePreview" style={imagePreviewStyle} > 			
                        </div>
                    </div>
                    <div class="change-btn flex items-center flex-wrap">
                        <input type='file' class="hidden"  id="imageUpload" on:change={readURL} accept=".png, .jpg, .jpeg">
                        <label for="imageUpload" class="btn btn-secondary sm:py-[0.719rem] px-4 sm:px-[1.563rem] py-2.5 sm:text-[15px] text-[13px] font-medium rounded-md bg-b-color leading-5 inline-block border border-b-color duration-500 hover:bg-[#f9f9f9] hover:border-[#f9f9f9] mb-2">Select Image</label>
                    </div>
                </div>		
            </div>
        </div>
    </div>
	<div class="row">

        <div class="w-full max-w-xs mx-auto">
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Select a country</label>
            <select id="countries" class="select2 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
              <option value="AF">Afghanistan</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AO">Angola</option>
              <option value="AR">Argentina</option>
              <!-- Autres options -->
            </select>
          </div>

          <InputSelect selectedId = {2} label="Selectionner un pays" datas={data} id='pays'/>
          <InputDate/>
          <Datepicker datepickerFormat="dd/mm/yyyy" />
    
{#if user}
<p>Bienvenue, {user.id} !</p>
<p>Votre rôle est : {user.role}</p>
<p>Votre token : {user.token}</p>
{:else}
<p>Utilisateur non authentifié.</p>
{/if}

    </div>
</div>