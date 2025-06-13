import Results from "../../models/Results";

export async function POST(req) {
    const { wpm, netWpm, accuracy, wordCount, typeOfTest } = await req.json();
       if(wpm==0 || netWpm==0 || accuracy==0 || wordCount==0 || typeOfTest==""){ 
        return new Response("");
    }
    try{
     
        const result = new Results({
            wpm,
            netWpm,
            accuracy,
            wordCount,
            typeOfTest
        })
        // console.log(result);
          result.save()
        return new Response (JSON.stringify({ message: "Data saved successfully" }), { status: 200 });

    }
    catch (error) {
        console.error("Error saving data:", error);
        return new Response(JSON.stringify({ error: "Failed to save data" }), { status: 500 });
    }
}