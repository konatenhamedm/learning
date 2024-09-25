<script lang="ts">
    import Spinner from '$components/_skeletons/Spinner.svelte';
    import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
    export let open: boolean = false; // modal control
    let isLoad = false;
    let numeroEtatge = "";
    let numeroAppartement = "";
    let nombrePiece = "";
    let details = "";
    let loyer = "";
    export let data: Record<string, string> = {};

    // Initialize form data with the provided record
    function init(form: HTMLFormElement) {
        if (data?.numeroEtatge) [data.first_name, data.last_name] = data.numeroEtatge.split(' ');
        for (const key in data) {
            const el = form.elements.namedItem(key);
            if (el) el.value = data[key];
        }
    }

    // Save function with modal close and refresh logic
    async function SaveFunction() {
        isLoad = true;

        try {
            // Example POST request (replace with your actual API call)
            /* const res = await fetch('http://148.113.143.59:8081/api/countries/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ numeroEtatge, numeroAppartement, nombrePiece, loyer, details })
            });

            if (res.ok) { */
            // Simulating success here
            setTimeout(() => {
                isLoad = false;
                open = false; // Close the modal
              //  window.location.reload(); // Refresh the page or grid
            }, 500);
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
    title={Object.keys(data).length ? 'Modification ville' : 'Ajout ville'}
    size="lg"
    class="m-4"
    on:close={handleModalClose}
>
    <!-- Modal body -->
    <div class="space-y-6 p-0">
        <form action="#" use:init>
            <div class="grid grid-cols-6 gap-6">
                <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Numero Etage</span>
                    <Input name="numeroEtatge" bind:value={numeroEtatge} class="border outline-none" placeholder="e.g. 1" required />
                </Label>
                <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Numero Appartement</span>
                    <Input name="numeroAppartement" bind:value={numeroAppartement} class="border outline-none" placeholder="e.g. B6" required />
                </Label>
                <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Nombre Pièce</span>
                    <Input name="nombrePiece" bind:value={nombrePiece} class="border outline-none" placeholder="e.g. 2" required />
                </Label>
                <Label class="col-span-6 space-y-2 sm:col-span-3">
                    <span>Loyer</span>
                    <Input name="loyer" bind:value={loyer} class="border outline-none" placeholder="e.g. 50000" required />
                </Label>
                <Label class="col-span-6 space-y-2">
                    <span>Details</span>
                    <Textarea
                        id="details" bind:value={details}
                        rows="4"
                        class="bg-gray-50 outline-none dark:bg-gray-700"
                        placeholder="Description..."
                    ></Textarea>
                </Label>
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
