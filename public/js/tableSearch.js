document.getElementById('search').addEventListener('keyup', () => {
    try {
        query = document.getElementById('search').value.toLowerCase()
        table = document.getElementById('filetable');
        tr = table.getElementsByTagName("tr");
    
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(query) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    catch (err) {}
})