<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
<script lang="ts">
    import Entete from "$components/_includes/Entete.svelte";
    import {  Button,  Input, Table,Indicator, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {  EditOutline, TrashBinSolid,EyeOutline } from 'flowbite-svelte-icons';
    import type { ComponentType } from 'svelte';
    import Users from '../../data/users.json';
    import Products from '../../data/product.json';
    import User from './User.svelte';
    import Add from "./Add.svelte";
    import Edit from "./Edit.svelte";
    import Show from "./Show.svelte";
    import Delete from "./Supprime.svelte";
    import Pagination from "$components/_includes/Pagination.svelte";
	import { pageSize } from '../../../store'; // Importer le store pageSize
	import { get } from 'svelte/store';
	import type { Appartement, Ville } from '../../../types';
	import { onMount } from 'svelte';
    import { BASE_URL } from "$lib/api";


	let openUser: boolean = false; // modal control
	let openDelete: boolean = false; // modal control
	let openEdit: boolean = false; // modal control
	let openAdd: boolean = false; // modal control
	let openShow: boolean = false; // modal control
	let current_data: any = {};
	let currentPage = 1;
	let main_data: Appartement[] = [];
	let loading = false;
	let searchQuery = '';

	async function fetchData() {
        loading = true;
        try {
            const res = await fetch(BASE_URL +'/appartement/');
            if (res.ok) {
                const result = await res.json();
                main_data = result.data as Appartement[];
            } else {
                console.error("Failed to fetch data:", res.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        loading = false;
    }

	onMount(async()=> {
        fetchData();
    })

    $: filteredData = main_data.filter(item => {
        return item.numeroAppartement.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.numeroEtatge.toLowerCase().includes(searchQuery.toLowerCase());
    });

    $: totalPages = Math.ceil(filteredData.length / get(pageSize));

    $: paginatedProducts = filteredData.slice((currentPage - 1) * get(pageSize), currentPage * get(pageSize));


	$: startRange = currentPage;
  $: endRange = Math.min(currentPage + get(pageSize), totalPages);
  
    function handlePageChange(event: CustomEvent) {
        currentPage = event.detail;
    }

    // Rafraîchissement après fermeture des modales
    $: if (!openAdd || !openEdit || !openDelete) {
        fetchData();
    }
</script>
	<Entete libelle="Accueil" lien="dd"/>
	<div class="container-fluid">
	<div class="row">
		<div class="w-full">
			<div class="card overflow-hidden relative">
				<div class="card-body p-0">
					<div class="overflow-x-auto active-projects style-1">
					<div class="tbl-caption flex justify-between items-center flex-wrap p-5 relative z-[2]">
						<h4 class="max-sm:mb-2.5">Employees</h4>
						
						<div>
							<a class="py-[5px] px-3 text-[13px] rounded text-white bg-primary leading-[18px] inline-block border border-primary btn-sm duration-500 hover:bg-hover-primary "  on:click={() => ((current_data = {}), (openAdd = true))} href="javascript:void(0);">+ Nouveau produit</a>
							<!-- <button type="button" class="btn btn-secondary py-[5px] px-3 text-[13px] rounded text-white bg-secondary leading-[18px] inline-block border border-secondary btn-sm dz-modal-btn" data-dz-modal="Employeemodal">
								+ Invite Employee
							</button> -->
						</div>
					</div>
					
						<!-- placer le tableau ici -->
						<div class="table-responsive p-5">
							<div class=" w-full grid grid-cols-4">

								<div>
										<Input
								placeholder="Rechercher..."
								type="text"
								bind:value={searchQuery}
								class="mb-4"
							/>
								</div>
								<div class="col-span-3">

								</div>
							
							</div>
								<Table>
									<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
										<!-- <TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell> -->
										{#each ['Product Name', 'Technology','Numério etage', 'Actions'] as title}
											<TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
										{/each}
									</TableHead>
									<TableBody>
										{#if paginatedProducts.length === 0}
										<!-- Affiche un message lorsque le tableau est vide -->
										<TableBodyRow>
											<TableBodyCell colspan="7" class="text-center p-4 text-gray-500">
												Aucune données en base.
											</TableBodyCell>
										</TableBodyRow>
										{:else}
										{#each paginatedProducts  as item}
											<TableBodyRow class="text-base">
												<!-- <TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell> -->
												<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
													<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
														<div class="text-base font-semibold text-gray-900 dark:text-white">
															{item.id}
														</div>
														<!-- <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
															{item.numeroEtatge}
														</div> -->
													</div>
												</TableBodyCell>
												<TableBodyCell class="p-4">{item.numeroEtatge}</TableBodyCell>
												<TableBodyCell class="p-4">{item.numeroAppartement}</TableBodyCell>
												
												<TableBodyCell class="space-x-1 p-2 w-8">
												<Button
													color="green"
													size="sm"
													class="gap-2 px-3"
													on:click={() => ((current_data = item), (openShow = true))}>
													<EyeOutline size="sm" /> 
												</Button>
												<Button color="blue"
													size="sm"
													class="gap-2 px-3"
													on:click={() => ((current_data = item), (openEdit = true))}>
													<EditOutline size="sm" /> 
												</Button>
						
												<Button
													color="red"
													size="sm"
													class="gap-2 px-3"
													on:click={() => ((current_data = item), (openDelete = true))}
												>
													<TrashBinSolid size="sm" /> 
												</Button>
						
												</TableBodyCell>
											</TableBodyRow>
										{/each}
										{/if}
									</TableBody>
								</Table>
							</div>
					
							<div class="w-full grid  grid-cols-4">
								<div class="col-span-3 p-2">
									<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
										Affichage
										<span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
										<!-- de
										<span class="font-semibold text-gray-900 dark:text-white">{totalPages}</span> -->
										sur un total de
										<span class="font-semibold text-gray-900 dark:text-white">{filteredData.length}</span>
									  </span>
								</div>
								<div class="flex p-2 justify-end">
								   {#if totalPages > 1 }
									
								   <Pagination {currentPage} {totalPages} on:changePage={handlePageChange} />
								   {/if}
								</div>

							</div>
							
						<!-- End Pagination -->
						<!-- placer le tableau ici -->
					</div>
				</div>
			</div>
		</div>
	</div>	
	</div>
	<User bind:open={openUser} data={current_data} />
	<Add bind:open={openAdd} data={current_data} />
	<Edit bind:open={openEdit} data={current_data} />
	<Show bind:open={openShow} data={current_data} />
	<Delete bind:open={openDelete} />

