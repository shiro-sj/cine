import puppeteer from 'puppeteer';

export const POST = async (req: Request): Promise<Response> => {
  try {
    const { htmlContent, width, height } = await req.json();

    if (!htmlContent) {
      return new Response(
        JSON.stringify({ message: 'No HTML content provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!width || !height) {
      return new Response(
        JSON.stringify({ message: 'No width and height provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Received width:', width);
    console.log('Received height:', height);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: parseInt(width, 10), height: parseInt(height, 10) });

    const imageBuffer = await page.screenshot({ type: 'png' });
    await browser.close();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="rendered-image.png"',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to generate image' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
