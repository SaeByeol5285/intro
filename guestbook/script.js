const supabaseUrl = 'https://ukavvlyjdbyusvkcqhpz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrYXZ2bHlqZGJ5dXN2a2NxaHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTA2NjgsImV4cCI6MjA1NTc4NjY2OH0.fryWZ1lbRVLwjIjDMH8LWEq5SYj0gC2W5I5j2ENuZLA"
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


async function fnFetch(){
    const { data, error } = await supabase.from("guestbook").select("*");
    if(error){
        console.error("데이터 불러오기 실패:", error);
    }else{
        let guest_list = document.querySelector("#guest_list");
        //리스트 초기화
        guest_list.innerHTML = 
            `<tr>
                <th>이름</th>
                <th>내용</th>
            </tr>
        `;
        //리스트 넣기
        data.forEach((entry)=>{
            let row = document.createElement("tr");
            row.innerHTML = 
                `<td>${entry.name}</td>
                <td>${entry.message}</td>`;
            guest_list.appendChild(row);          
        });       
    }
};
fnFetch();

document.getElementById("guestbook").addEventListener("submit", async function (event){
    event.preventDefault(); 
    
    let name = document.querySelector("#name").value.trim();
    let message = document.querySelector("#message").value.trim();
    
    if(!name || !message){
        alert("이름과 메시지를 입력해주세요!");
        return;
    }
    const { error } = await supabase
        .from('guestbook')
        .insert([{ name, message}])
    if(error){
        alert("오류발생!");
    }else{
        alert("🐾🐾방명록이 저장되었다냥🐾🐾");
        //초기화
        document.querySelector("#name").value = "";
        document.querySelector("#message").value = "";
        //자동새로고침
        fnFetch();
    }           
});






