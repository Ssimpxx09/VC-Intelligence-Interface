export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    // Demo mapping of company → website
    const sites: Record<string, string> = {
        "1": "https://openai.com",
        "2": "https://stripe.com",
        "3": "https://razorpay.com",
        "4": "https://neuroflow.ai",
        "5": "https://greenvolt.com",
    };
    
    const url = sites[id || "1"];
    
    const res = await fetch(url);
    const html = await res.text();
    
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "No title";
    
    const descMatch = html.match(
        /<meta name="description" content="(.*?)"/i
    );
    const description = descMatch
        ? descMatch[1]
        : "No description found";
    
    return Response.json({
        summary: description,
        whatTheyDo: [title],
        keywords: ["AI", "Tech"],
        signals: ["Website active"],
        length: html.length,
        sources: url,
        timestamp: new Date().toISOString()
    });
    }