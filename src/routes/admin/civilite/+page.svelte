<script lang="ts">
    import Entete from "$components/_includes/Entete.svelte";
    import { Button, Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { EditOutline, TrashBinSolid, EyeOutline } from 'flowbite-svelte-icons';
    import type { Civilite } from '../../../types';
	import Add from "./Add.svelte";
	import Edit from "./Edit.svelte";
	import Show from "./Show.svelte";
	import Delete from "./Supprime.svelte";
    import Pagination from "$components/_includes/Pagination.svelte";
	import { pageSize } from '../../../store'; // Importer le store pageSize
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
    import { apiFetch } from "$lib/api";
    import MessageError from "$components/MessageError.svelte";
    import MetaTag from "../../utils/MetaTag.svelte";

    const path: string = '/admin/civilite';
    const description: string = 'Liste des civilite freewan';
    const title: string = 'Admin | Civilités';
    const subtitle: string = 'Liste civilités';
  

 
	let openDelete: boolean = false;
	let openEdit: boolean = false;
	let openAdd: boolean = false;
	let openShow: boolean = false;
	let current_data: any = {};

    // Données et pagination
	let currentPage = 1;
	let main_data: Civilite[] = [];
	let loading = false;
	$: searchQuery = '';

    // Fonction pour récupérer les données
	async function fetchData() {
		loading = true; // Active le spinner de chargement
    try {
        const res = await apiFetch('/');
        if (res) {
            main_data = res.data as Civilite[];
        } else {
            console.error("Failed to fetch data:", res.statusText);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading = false; // Désactive le spinner de chargement
    }
    }

	onMount(async() => {
        fetchData();
    });

    // Filtrage des données selon la recherche
    $: filteredData = main_data.filter(item => {
        return item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.libelle.toLowerCase().includes(searchQuery.toLowerCase());
    });

   // $: totalPages = Math.ceil(filteredData.length / get(pageSize));
   $: totalPages = Math.max(1, Math.ceil(filteredData.length / get(pageSize)));

    //$: paginatedProducts = filteredData.slice((currentPage - 1) * get(pageSize), currentPage * get(pageSize));
	$: paginatedProducts = filteredData.length > 0
    ? filteredData.slice((currentPage - 1) * get(pageSize), currentPage * get(pageSize))
    : [];


	$: startRange = currentPage;
  	$: endRange = Math.min(currentPage + get(pageSize), totalPages);

    function handlePageChange(event: CustomEvent) {
        currentPage = event.detail;
    }

	$: if (currentPage > totalPages) {
    currentPage = totalPages;
	}

	$: if (filteredData.length === 0) {
    currentPage = 1;
	}

	// Fonction pour rafraîchir les données après certaines actions
    async function refreshDataIfNeeded() {
       /*  if (openAdd === false || openEdit === false || openDelete === false) { */
            fetchData(); // Rafraîchir les données uniquement après fermeture des modales
       /*  } */
    }

    // Rafraîchir les données après fermeture des modales
    $: if (!openAdd || !openEdit || !openDelete) {

		refreshDataIfNeeded();
	
    }

    // Gestion des permissions
    type Permission = 'R' | 'RD' | 'RU' | 'CRUD' | 'CR' | "CRU" | "null";
    const permission: Permission = "CRUD";
    const allowedPermissions = ["CR", "CRU", "CRUD"];

    const renders = {
        edit: (permission: Permission) => ['RU', 'CRUD', 'CRU'].includes(permission),
        delete: (permission: Permission) => ['RD', 'CRUD'].includes(permission),
        show: (permission: Permission) => ['R', 'RD', 'RU', 'CRUD', 'CRU'].includes(permission),
    };
</script>

<MetaTag {path} {description} {title} {subtitle} />

<Entete libelle="Accueil" lien="dd" />

<div class="container-fluid">
    <div class="row">
        <div class="w-full">
            <div class="card overflow-hidden relative">
                <div class="card-body p-0">
                    <div class="overflow-x-auto active-projects style-1">
                        <div class="tbl-caption flex justify-between items-center flex-wrap p-5 relative z-[2] border border-b-gray-300">
                            <h4 class="max-sm:mb-2.5">Liste des civilités</h4>
                            <div>
                                {#if allowedPermissions.includes(permission)}
                                <a class="py-[5px] px-3 text-[13px] rounded text-white bg-primary cursor-pointer leading-[18px]  inline-block border border-primary btn-sm duration-500 hover:bg-hover-primary"
                                    on:click={() => ((current_data = {}), (openAdd = true))}>
                                    + Nouveau civilite
                                </a>
                                {/if}
                            </div>
                        </div>

                        {#if permission == "null"}
						<div class="table-responsive p-5 flex flex-row w-full items-center justify-center">
							<MessageError/>
						</div>
                        {:else}

						<!-- Table de données -->
                        <div class="table-responsive p-5">
                            <div class="w-full grid grid-cols-4">
                                <div>
                                    <Input placeholder="Rechercher..." type="text" bind:value={searchQuery} class="mb-4" />
                                </div>
                            </div>

                            <Table>
                                <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
                                    {#each ['ID', 'Code', 'Libellé', 'Actions'] as title}
                                        <TableHeadCell class="ps-4 font-normal">{title}</TableHeadCell>
                                    {/each}
                                </TableHead>
                                <TableBody>
									{#if loading && paginatedProducts.length === 0 }
                                    <TableBodyRow>
                                        <TableBodyCell colspan="7" class="text-center items-center p-4 text-gray-500">
                                            <div class="flex flex-row gap-2 items-center justify-center">
                                                <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                                <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                                <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                            </div>
                                        </TableBodyCell>
                                    </TableBodyRow>
                                   
								{:else}
									{#if paginatedProducts.length === 0}
										<TableBodyRow>
											<TableBodyCell colspan="7" class="text-center items-center p-4 text-gray-500">
												<div class="flex flex-row items-center justify-center">
													<div class="grid grid-cols-1">
                                                        <img src="/search_notfound.svg" alt="Aucun résultat trouvé" /><br>
                                                    <h1 class="text-2xl font-bold">Aucun résultat</h1>
                                                    </div>
												</div>
											</TableBodyCell>
										</TableBodyRow>
									{:else}
										{#each paginatedProducts as item}
											<TableBodyRow class="text-base">
												<TableBodyCell class="flex items-center space-x-6 whitespace-nowrap p-4">
													<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
														<div class="text-base font-semibold text-gray-900 dark:text-white">
															{item.id}
														</div>
													</div>
												</TableBodyCell>
												<TableBodyCell class="p-4">{item.code}</TableBodyCell>
												<TableBodyCell class="p-4">{item.libelle}</TableBodyCell>
												<TableBodyCell class="space-x-1 p-2 w-8">
													{#if renders.show(permission)}
														<Button color="green" size="sm" class="gap-2 px-3" on:click={() => ((current_data = item), (openShow = true))}>
															<EyeOutline size="sm" />
														</Button>
													{/if}
													{#if renders.edit(permission)}
														<Button color="blue" size="sm" class="gap-2 px-3" on:click={() => ((current_data = item), (openEdit = true))}>
															<EditOutline size="sm" />
														</Button>
													{/if}
													{#if renders.delete(permission)}
														<Button color="red" size="sm" class="gap-2 px-3" on:click={() => ((current_data = item), (openDelete = true))}>
															<TrashBinSolid size="sm" />
														</Button>
													{/if}
												</TableBodyCell>
											</TableBodyRow>
										{/each}
									{/if}
								{/if}
								
                                </TableBody>
                            </Table>
                        </div>

                        <!-- Pagination -->
                        <div class="w-full grid grid-cols-4">
                            <div class="col-span-3 p-2">
                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Affichage
                                    <span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
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
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modales -->
<Add bind:open={openAdd} data={current_data} />
<Edit bind:open={openEdit} data={current_data} />
<Show bind:open={openShow} data={current_data} />
<Delete bind:open={openDelete} data={current_data} />
