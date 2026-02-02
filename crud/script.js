let dataSiswa = JSON.parse(localStorage.getItem("siswa")) || [];
let editIndex = null;

function tampilData(list = dataSiswa){
    let tabel = document.getElementById("tabelData");
    tabel.innerHTML = "";

    list.forEach((siswa, index) => {
        tabel.innerHTML += `
        <tr>
            <td>${siswa.id}</td>
            <td>${siswa.nama}</td>
            <td>${siswa.kelas}</td>
            <td>
                <button class="btn-edit" onclick="editData(${index})">Edit</button>
                <button class="btn-hapus" onclick="hapusData(${index})">Hapus</button>
            </td>
        </tr>`;
    });
}

function simpanData(){
    let nama = document.getElementById("nama").value;
    let kelas = document.getElementById("kelas").value;
    let notif = document.getElementById("notif");

    if(!nama || !kelas){
        alert("Isi semua data!");
        return;
    }

    if(editIndex === null){
        dataSiswa.push({
            id: Date.now(),
            nama,
            kelas
        });
        notif.innerText = "Data berhasil ditambahkan!";
    } else {
        dataSiswa[editIndex].nama = nama;
        dataSiswa[editIndex].kelas = kelas;
        notif.innerText = "Data berhasil diupdate!";
        editIndex = null;
    }

    localStorage.setItem("siswa", JSON.stringify(dataSiswa));
    resetForm();
    tampilData();
}

function editData(index){
    let siswa = dataSiswa[index];
    document.getElementById("nama").value = siswa.nama;
    document.getElementById("kelas").value = siswa.kelas;
    editIndex = index;
}

function hapusData(index){
    if(confirm("Yakin hapus data?")){
        dataSiswa.splice(index,1);
        localStorage.setItem("siswa", JSON.stringify(dataSiswa));
        tampilData();
    }
}

function batalEdit(){
    editIndex = null;
    resetForm();
}

function resetForm(){
    document.getElementById("nama").value = "";
    document.getElementById("kelas").value = "";
}

function cariData(){
    let keyword = document.getElementById("cari").value.toLowerCase();
    let hasil = dataSiswa.filter(s =>
        s.nama.toLowerCase().includes(keyword)
    );
    tampilData(hasil);
}

tampilData();