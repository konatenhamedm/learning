<script lang="ts">
    import Spinner from '$components/_skeletons/Spinner.svelte';
    import InputSimple from '$components/inputs/inputSimple.svelte';
    import { BASE_URL_LOCAL } from '$lib/api';
    import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
    export let open: boolean = false; // modal control
    let isLoad = false;
    let code = "";
    let libelle = "";
  
    export let data: Record<string, string> = {};

    // Initialize form data with the provided record
    function init(form: HTMLFormElement) {
        if (data?.numeroEtatge) [data.first_name, data.last_name] = data.numeroEtatge.split(' ');
       /*  for (const key in data) {
            const el = form.elements.namedItem(key);
            if (el) el.value = data[key];
        } */

        code = data.code || ""; // Initialiser code avec la valeur de data
        libelle = data.libelle || ""; // Initialiser libelle avec la valeur de data
    }

    // Save function with modal close and refresh logic
    async function SaveFunction() {
        isLoad = true;

        try {
            // Example POST request (replace with your actual API call)
            const res = await fetch(BASE_URL_LOCAL +'/update/'+data?.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code, libelle })
            });

            if (res.ok) {
                isLoad = false;
                open = false; // Close the modal
            }

        } catch (error) {
            console.error("Error saving:", error);
        }
    }

    function handleModalClose(event: Event) {
        if (isLoad) {
            event.preventDefault(); // Prevent modal from closing if loading
        }
    }
</script>

<Modal
    bind:open
    title={Object.keys(data).length ? 'Modification civilite' : 'Modification civilite'}
    size="lg"
    class="m-4"
    on:close={handleModalClose}
>
    <!-- Modal body -->
    <div class="space-y-6 p-0">
        <form action="#" use:init>
            <div class="grid grid-cols-6 gap-6">
                <InputSimple fieldName="code" label='Code' field={code} placeholder="entrez le code"/>
                <InputSimple fieldName="libelle" label='Libelle' field={libelle} placeholder="entrez le libelle"/>
                <!-- <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Code</span>
                    <Input name="code" bind:value={code} class="border outline-none" placeholder="e.g. 1" required />
                </Label> -->
                <!-- <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Libelle</span>
                    <Input name="libelle" bind:value={libelle} class="border outline-none" placeholder="e.g. B6" required />
                </Label> -->
               
                
            </div>
        </form>
    </div>

    <!-- Modal footer -->
    <div slot="footer" class="w-full">
        <div class="flex justify-end">
            {#if isLoad}
			<Button disabled={true}  color='blue'  type="submit">
				<div class="flex flex-row gap-2">
					<div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
					<div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
					<div class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
				</div>
			</Button>
            {:else}
                <Button color='blue' on:click={SaveFunction} type="submit">Enregistrer</Button>
            {/if}
        </div>
    </div>
</Modal>
