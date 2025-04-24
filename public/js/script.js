// Simple sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Sidebar toggle behavior
  var sidebarCheckbox = document.getElementById('sidebar-checkbox');
  var sidebarToggle = document.querySelector('.sidebar-toggle');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      sidebarCheckbox.checked = !sidebarCheckbox.checked;
    });
  }
  
  // Close sidebar when clicking outside
  document.addEventListener('click', function(e) {
    var target = e.target;
    var sidebar = document.querySelector('.sidebar');
    var sidebarCheckbox = document.getElementById('sidebar-checkbox');
    
    // If sidebar is open and click is outside sidebar and not on toggle
    if (sidebarCheckbox.checked && 
        !sidebar.contains(target) && 
        !target.classList.contains('sidebar-toggle')) {
      sidebarCheckbox.checked = false;
    }
  });
});