<script>
    import Entete from '$components/_includes/Entete.svelte';
    import { onMount } from 'svelte';
  
    let articles = [];
    let loading = false;
    let currentPage = 1;
    let searchParams = {
      title: '',
      author: '',
      startDate: '',
      endDate: '',
    };
  
    // Fonction pour charger les articles
    async function loadArticles() {
      loading = true;
      try {
        const res = await fetch(`/api/articles?page=${currentPage}&title=${searchParams.title}&author=${searchParams.author}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`);
        const data = await res.json();
        articles = [...articles, ...data.articles]; // Ajout des nouveaux articles
        currentPage++;
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        loading = false;
      }
    }
  
    // Fonction pour effectuer une nouvelle recherche quand un paramètre change
    function searchArticles() {
      articles = []; // Réinitialise la liste d'articles
      currentPage = 1; // Réinitialise la pagination
      loadArticles(); // Recharge les articles avec les nouveaux paramètres
    }
  
    // Charger les articles initiaux lors du montage de la page
    onMount(() => {
      loadArticles();
    });
  </script>
  

  <Entete libelle="Accueil" lien="dd"/>
	<div class="container-fluid">
	<div class="row">
		<div class="w-full">
			<div class="card overflow-hidden relative">
				<div class="card-body p-0">
					<div class="overflow-x-auto active-projects style-1">
					<div class="tbl-caption flex justify-between items-center flex-wrap p-5 relative z-[2]">
						<h4 class="max-sm:mb-2.5">Civilités</h4>
						
						<div>
							<a class="py-[5px] px-3 text-[13px] rounded text-white bg-primary leading-[18px] inline-block border border-primary btn-sm duration-500 hover:bg-hover-primary "  on:click={() => ((current_data = {}), (openAdd = true))} href="javascript:void(0);">+ Nouveau civilite</a>
							<!-- <button type="button" class="btn btn-secondary py-[5px] px-3 text-[13px] rounded text-white bg-secondary leading-[18px] inline-block border border-secondary btn-sm dz-modal-btn" data-dz-modal="Employeemodal">
								+ Invite Employee
							</button> -->
						</div>
					</div>
					
						<!-- placer le tableau ici -->
						<div class="table-responsive p-5">
							
							
<!-- Formulaire de recherche avancée -->
<form>
    <label for="title">Titre</label>
    <input type="text" id="title" bind:value={searchParams.title} on:input={searchArticles} placeholder="Rechercher par titre" />
  
    <label for="author">Auteur</label>
    <input type="text" id="author" bind:value={searchParams.author} on:input={searchArticles} placeholder="Rechercher par auteur" />
  
    <label for="startDate">Date de début</label>
    <input type="date" id="startDate" bind:value={searchParams.startDate} on:change={searchArticles} />
  
    <label for="endDate">Date de fin</label>
    <input type="date" id="endDate" bind:value={searchParams.endDate} on:change={searchArticles} />
  </form>
  
  <!-- Liste des articles -->
  <section>
    {#each articles as article}
      <article>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
        <p>Publié le: {article.publishedDate}</p>
        <p>{article.content}</p>
      </article>
    {/each}
  </section>
  
  <!-- Bouton "Charger plus" -->
  {#if !loading && articles.length > 0}
    <button on:click={loadArticles}>Charger plus</button>
  {/if}
  
  <!-- Afficher un indicateur de chargement si nécessaire -->
  {#if loading}
    <p>Chargement...</p>
  {/if}
							</div>
					
							
							
						<!-- End Pagination -->
						<!-- placer le tableau ici -->
					</div>
				</div>
			</div>
		</div>
	</div>	
	</div>
  

<!-- 
    <script>
        import { onMount } from 'svelte';
      
        let articles = [];
        let loading = false;
        let currentPage = 1;
        let searchParams = {
          title: '',
          author: '',
          startDate: '',
          endDate: '',
        };
      
        // Fonction pour charger les articles depuis une API externe
        async function loadArticles() {
          loading = true;
          try {
            const res = await fetch(`https://api.exemple.com/articles?page=${currentPage}&title=${searchParams.title}&author=${searchParams.author}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}`);
            const data = await res.json();
            articles = [...articles, ...data.articles]; // Ajout des nouveaux articles
            currentPage++;
          } catch (error) {
            console.error('Erreur lors du chargement des articles:', error);
          } finally {
            loading = false;
          }
        }
      
        // Fonction pour effectuer une nouvelle recherche quand un paramètre change
        function searchArticles() {
          articles = []; // Réinitialise la liste d'articles
          currentPage = 1; // Réinitialise la pagination
          loadArticles(); // Recharge les articles avec les nouveaux paramètres
        }
      
        // Charger les articles initiaux lors du montage de la page
        onMount(() => {
          loadArticles();
        });
      </script>
      
      
      <form>
        <label for="title">Titre</label>
        <input type="text" id="title" bind:value={searchParams.title} on:input={searchArticles} placeholder="Rechercher par titre" />
      
        <label for="author">Auteur</label>
        <input type="text" id="author" bind:value={searchParams.author} on:input={searchArticles} placeholder="Rechercher par auteur" />
      
        <label for="startDate">Date de début</label>
        <input type="date" id="startDate" bind:value={searchParams.startDate} on:change={searchArticles} />
      
        <label for="endDate">Date de fin</label>
        <input type="date" id="endDate" bind:value={searchParams.endDate} on:change={searchArticles} />
      </form>
      
   
      <section>
        {#each articles as article}
          <article>
            <h2>{article.title}</h2>
            <p>{article.author}</p>
            <p>Publié le: {article.publishedDate}</p>
            <p>{article.content}</p>
          </article>
        {/each}
      </section>
      

      {#if !loading && articles.length > 0}
        <button on:click={loadArticles}>Charger plus</button>
      {/if}
      
      
      {#if loading}
        <p>Chargement...</p>
      {/if} -->
      