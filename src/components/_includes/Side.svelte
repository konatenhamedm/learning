<script lang="ts">
  import { page } from '$app/stores';
  import Menu from '../../routes/data/menu.json';

  let main_data = Menu;
  let activeMenuIndex = 0; // Pour n'ouvrir que le premier menu au chargement

  function toggleMenu(index: number) {
    if (activeMenuIndex === index) {
      activeMenuIndex = -1; // Fermer si le même menu est cliqué
    } else {
      activeMenuIndex = index; // Ouvrir le menu cliqué
    }
  }
</script>

<!-- Sidebar start -->
<div class="deznav">
  <div class="deznav-scroll mm-active">
<ul class="metismenu mm-show" id="menu">
  {#each main_data as menu, index}
    <li class="menu-title">{menu.libelle}</li>

      {#if menu.sous_menu.length > 0 }
        {#each menu.sous_menu as sous_menu,index_sous_menu}
          <li class="{index == 0 && index_sous_menu == 0 ? 'mm-active' : ''} "><a class="has-arrow " href="javascript:void(0);">
            <div class="menu-icon"> 
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M7.5 18.3333V10H12.5V18.3333" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>	
            <span class="nav-text">{sous_menu.libelle}</span>
            </a>
            <ul class="{index == 0 && index_sous_menu == 0 ?'sub-menu mm-collapse mm-show left' : 'sub-menu mm-collapse left'}">
              {#each sous_menu.menus as menu_sous_menu}
                
              <li aria-current={$page.url.pathname === menu_sous_menu.code ? 'page' : undefined} class={$page.url.pathname === menu_sous_menu.code ? "mm-active" : ''}><a href="{menu_sous_menu.code}" class={$page.url.pathname === menu_sous_menu.code ? "mm-active" : ''}>{menu_sous_menu.libelle}</a></li>
              {/each}
              
            </ul>
          </li>
      
        {/each}
      {/if}

      {#each menu.menu_directe as menu_directe,index_menu_direct}
              <li aria-current={$page.url.pathname === menu_directe.code ? 'page' : undefined}  class={$page.url.pathname === menu_directe.code || (index == 0 && index_menu_direct == 0 && menu.sous_menu.length == 0) ? "mm-active" : ''}>
                <a class={$page.url.pathname === menu_directe.code ? "mm-active" : ''} href="{menu_directe.code}">
                <div class="menu-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>	
                  <span class="nav-text">{menu_directe.libelle}</span>
                </a>
              </li>
      {/each}
  {/each}

 
<!-- ================= -->

<!-- <li class="menu-title">OUR FEATURES</li>
<li><a class="has-arrow " href="javascript:void(0);">
  <div class="menu-icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.11086 10.2878V13.7208" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M8.86244 12.0045H5.35974" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M13.0856 10.3924H12.9875" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M14.748 13.6691H14.6499" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M6.39948 0.833328C6.39948 1.5121 6.96092 2.06236 7.65349 2.06236H8.62193C9.69042 2.06617 10.5559 2.9144 10.5608 3.9616V4.5804" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0593 19.1324C11.3045 19.1791 8.60026 19.1771 5.94166 19.1324C2.99069 19.1324 0.833313 17.0275 0.833313 14.1354V9.87325C0.833313 6.98107 2.99069 4.8762 5.94166 4.8762C8.61483 4.83051 11.321 4.83146 14.0593 4.8762C17.0102 4.8762 19.1666 6.98203 19.1666 9.87325V14.1354C19.1666 17.0275 17.0102 19.1324 14.0593 19.1324Z" stroke="#888888" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </div>
  <span class="nav-text">Apps </span>
  </a>
  <ul class="sub-menu mm-collapse left">
    <li><a href="chat.html">Chat</a></li>
    <li><a class="has-arrow" href="javascript:void(0);">Users Manager</a>
      <ul class="sub-menu mm-collapse left">
        <li><a href="user.html">User</a></li>
        <li><a href="edit-profile.html">Add User</a></li>
        <li><a href="user-roles.html">Roles Listing </a></li>
        <li><a href="add-role.html">Add Roles</a></li>
        <li><a href="app-profile.html">Profile 1</a></li>
        <li><a href="app-profile-2.html">Profile 2 </a></li>
        <li><a href="edit-profile.html">Edit Profile</a></li>
        <li><a href="post-details.html">Post Details</a></li>
      </ul>
    </li>
    <li><a class="has-arrow" href="javascript:void(0);">Customer Manager</a>
      <ul class="sub-menu mm-collapse left">
        <li><a href="customer.html">Customer</a></li>
        <li><a href="customer-profile.html">Customer Profile</a></li>
      </ul>
    </li>
    <li><a href="contacts.html">Contacts </a></li>
    <li><a class="has-arrow" href="javascript:void(0);">Email</a>
      <ul class="sub-menu mm-collapse left">
        <li><a href="email-compose.html">Compose</a></li>
        <li><a href="email-inbox.html">Inbox</a></li>
        <li><a href="email-read.html">Read</a></li>
      </ul>
    </li>
    <li><a href="app-calender.html">Calendar</a></li>
    <li><a class="has-arrow" href="javascript:void(0);">Shop</a>
      <ul class="sub-menu mm-collapse left">
        <li><a href="ecom-product-grid.html">Product Grid</a></li>
        <li><a href="ecom-product-list.html">Product List</a></li>
        <li><a href="ecom-product-detail.html">Product Details</a></li>
        <li><a href="ecom-product-order.html">Order</a></li>
        <li><a href="ecom-checkout.html">Checkout</a></li>
        <li><a href="ecom-invoice.html">Invoice</a></li>
        <li><a href="ecom-customers.html">Customers</a></li>
      </ul>
    </li>
  </ul>
</li> -->
  
</ul>	
</div>
</div>
<!-- Sidebar end -->
