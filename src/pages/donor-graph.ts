import { getRuntime } from "@astrojs/cloudflare/runtime";
import { APIRoute } from "astro";

import initCanvasKit from "../canvasKit";
import { HOURS, cacheResponseFor } from "scripts/cache";

interface SponsorData {
    data: {
        user: {
            sponsors: {
                pageInfo: {
                    hasNextPage: boolean;
                    endCursor: string;
                };
                totalCount: number;
                nodes: Array<{
                    avatarUrl: string;
                }>;
            };
        };
    };
    errors?: any[];
}

async function fetchDonorPfps(
    githubToken: string,
    after: string | null = null
) {
    const query = `
      {
        user(login: "Vendicated") {
          sponsors(first: 100, after: ${JSON.stringify(after)}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              ... on User {
                avatarUrl
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `bearer ${githubToken}`,
            "User-Agent":
                "vencord.dev (https://github.com/Vencord/vencord.dev)",
        },
        body: JSON.stringify({ query }),
    });

    if (!res.ok) {
        const msg = await res.text().catch(() => "Unknown Error");
        throw new Error(`Failed to fetch sponsors: ${res.status}\n${msg}`);
    }

    const { data, errors } = (await res.json()) as SponsorData;
    if (errors)
        throw new Error(
            "Failed to fetch sponsors:\n" + JSON.stringify(errors, null, 4)
        );

    const {
        pageInfo: { hasNextPage, endCursor },
        nodes,
    } = data.user.sponsors;

    const avatarUrls = nodes.map(n => n.avatarUrl);

    if (hasNextPage) {
        const nextPages = await fetchDonorPfps(githubToken, endCursor);
        avatarUrls.push(...nextPages);
    }

    return avatarUrls;
}

export const get: APIRoute = async ({ url, request }) => {
    const CanvasKit = await initCanvasKit({
        locateFile: file => new URL(file, url).href,
    });

    const runtime = getRuntime<{ GITHUB_TOKEN: string }>(request);
    const { GITHUB_TOKEN } = runtime?.env ?? import.meta.env;

    const avatarUrls = import.meta.env.DEV
        ? HARDCODED_DATA
        : await fetchDonorPfps(GITHUB_TOKEN);

    const images = await Promise.all(
        avatarUrls.map(async urlString => {
            const url = new URL(urlString);
            url.searchParams.set("size", "64");
            const res = await fetch(url);
            if (!res.ok) return null;
            return res.arrayBuffer();
        })
    ).then(images => images.filter(Boolean) as ArrayBuffer[]);

    const IMAGE_SIZE = 64;
    const IMAGES_PER_ROW = 20;

    const imageCount = images.length;
    const width = IMAGE_SIZE * IMAGES_PER_ROW;
    const rowCount = (imageCount / IMAGES_PER_ROW) * IMAGE_SIZE;
    const height = Math.ceil(rowCount / IMAGE_SIZE) * IMAGE_SIZE;

    const canvas = CanvasKit.MakeCanvas(width, height);
    const ctx = canvas.getContext("2d")!;

    let col = 0;
    let row = 0;
    for (const img of images) {
        const decodedImage = canvas.decodeImage(img);
        ctx.drawImage(
            decodedImage as any as CanvasImageSource,
            col * IMAGE_SIZE,
            row * IMAGE_SIZE,
            IMAGE_SIZE,
            IMAGE_SIZE
        );

        if (++col === IMAGES_PER_ROW) {
            col = 0;
            row++;
        }
    }

    const res = await fetch(canvas.toDataURL());
    cacheResponseFor(res, 1 * HOURS);

    return res;
};

const HARDCODED_DATA = [
    "https://avatars.githubusercontent.com/u/131888424?u=1bf0720fa79a5b296f1e18fd4150ae8d92cafbf9&v=4",
    "https://avatars.githubusercontent.com/u/65369563?u=e824f7e358c76f5ac1948ddf6e6f13efb1941977&v=4",
    "https://avatars.githubusercontent.com/u/38012125?u=b4217abb0129d4a2077b4e5ca6895e755f3bea6e&v=4",
    "https://avatars.githubusercontent.com/u/33439542?u=43469926837c2825cb74dbfb91199f5a45b242e9&v=4",
    "https://avatars.githubusercontent.com/u/32175146?u=0b870d3d8fa78743224751b6868f4039bb421c40&v=4",
    "https://avatars.githubusercontent.com/u/28498877?u=d332c7d97b522b36c58b14be624661c1f89f975d&v=4",
    "https://avatars.githubusercontent.com/u/8019327?v=4",
    "https://avatars.githubusercontent.com/u/7051693?u=1973a96012c0f9cb0d8488a9d8a5525affb6a472&v=4",
    "https://avatars.githubusercontent.com/u/13762043?u=4abee8fab9078d3d99f4052b7ed0794a5a06077d&v=4",
    "https://avatars.githubusercontent.com/u/14080165?u=be22e2ca31941c0f5a35cfdf818ddd6e1e2ca325&v=4",
    "https://avatars.githubusercontent.com/u/18467466?u=409207f88ca58c8ba6f2599c8053de73218c0b9a&v=4",
    "https://avatars.githubusercontent.com/u/19526287?v=4",
    "https://avatars.githubusercontent.com/u/19695822?u=79f4258cff388c947f667986bb973d13a1a4a414&v=4",
    "https://avatars.githubusercontent.com/u/20693601?u=de50f8fd1bac1563c35400ee44bf117941a306a7&v=4",
    "https://avatars.githubusercontent.com/u/21136842?u=52aded389240423f5b77580fd50d6f35ff5572f5&v=4",
    "https://avatars.githubusercontent.com/u/22395617?u=e8222b4ba62c30b277bfc95759f54784c508a36f&v=4",
    "https://avatars.githubusercontent.com/u/22851444?u=8cda78b0fa9ed6fa8bc88a323e0629eaaa13cbc1&v=4",
    "https://avatars.githubusercontent.com/u/22969497?u=f1e0180564480664a72cf9f31b07a931c01ad967&v=4",
    "https://avatars.githubusercontent.com/u/23124097?u=aab678b704d21a2f64e58936e4545a17d96f6e16&v=4",
    "https://avatars.githubusercontent.com/u/23339109?u=d08f46edb665315fdc6e14022fc1c7ff3d28e589&v=4",
    "https://avatars.githubusercontent.com/u/24703318?u=ddc7662946fe45a2b53d7061314c70baeb41b737&v=4",
    "https://avatars.githubusercontent.com/u/24937357?u=c9db082a821da9dd328cdd13fb0d0cd88d888a31&v=4",
    "https://avatars.githubusercontent.com/u/26150814?u=92c74c231f260bcc4f2dec841c3f4c931a5a8b9b&v=4",
    "https://avatars.githubusercontent.com/u/26527896?u=146146a3bf82c442c1d386861ba0f1a4b5882411&v=4",
    "https://avatars.githubusercontent.com/u/26598490?u=6266eb649adb404293a53491e08c767ffed095df&v=4",
    "https://avatars.githubusercontent.com/u/26882526?u=ff9f72bd28d081e840c5491ec482da9cfcd12900&v=4",
    "https://avatars.githubusercontent.com/u/27978407?v=4",
    "https://avatars.githubusercontent.com/u/29357929?u=5ea988c780d91aec696d3b627412eba5ddb79ac4&v=4",
    "https://avatars.githubusercontent.com/u/29358311?u=6dfd3fca0a380426b79d5dcbb7ddc83d6d79f900&v=4",
    "https://avatars.githubusercontent.com/u/30928708?u=d05559558782fbc172a77877044df09a47aace7c&v=4",
    "https://avatars.githubusercontent.com/u/32019837?v=4",
    "https://avatars.githubusercontent.com/u/33388336?u=0d4a7432218df4e3e87d92a742b52723d007c9fd&v=4",
    "https://avatars.githubusercontent.com/u/33640860?u=f04c879683531a406f255e22eeada2b243cc391e&v=4",
    "https://avatars.githubusercontent.com/u/34152815?u=86115f616fd811442aeb25e2873e74c993381687&v=4",
    "https://avatars.githubusercontent.com/u/34608301?u=e01bc747273b0da4d41fce2e6ec882564f0b3cca&v=4",
    "https://avatars.githubusercontent.com/u/34724502?u=c6b1c4c4b67bb995a6eef189d558d567fbe30aa9&v=4",
    "https://avatars.githubusercontent.com/u/34739807?u=3bc9ec8c318da4e53872e74a7cd0f0034fe095ac&v=4",
    "https://avatars.githubusercontent.com/u/35670243?u=e9f08f9c5dc011f5070aed7901834bd00b857780&v=4",
    "https://avatars.githubusercontent.com/u/36969024?v=4",
    "https://avatars.githubusercontent.com/u/36977340?u=1ac42f7cc4dd143a603cb68d58fd08329dd61a49&v=4",
    "https://avatars.githubusercontent.com/u/37221303?u=27cb8e464d1c6f803c6f70bebf1381ba4ec3bde8&v=4",
    "https://avatars.githubusercontent.com/u/38463193?u=85e21a048cde8ec26d3dc12e11c756ffed61bb8d&v=4",
    "https://avatars.githubusercontent.com/u/38902185?u=5759f0e4b3659079190878d2914b0d4d66dc1f0d&v=4",
    "https://avatars.githubusercontent.com/u/40730498?u=d2b159f0ddb939b506583f75de57d1fcabc4b741&v=4",
    "https://avatars.githubusercontent.com/u/41978811?u=63a653fd41ebd04952aa6784df1de4134b9aaf65&v=4",
    "https://avatars.githubusercontent.com/u/43463252?u=dd5cc3e311cc7863f150864885b0484242a3226a&v=4",
    "https://avatars.githubusercontent.com/u/43814053?u=dcd910d745925812520046f32346506bca69fec8&v=4",
    "https://avatars.githubusercontent.com/u/44101876?v=4",
    "https://avatars.githubusercontent.com/u/44119886?u=869cf38032105232f73acf361321fe2153fd075b&v=4",
    "https://avatars.githubusercontent.com/u/44728118?u=5bbd1a7d65d57d183222cdb93afff6f0d8c7e1b4&v=4",
    "https://avatars.githubusercontent.com/u/44934310?u=e076285930ef4d4bc942d999517656c1bb12ae25&v=4",
    "https://avatars.githubusercontent.com/u/45928149?u=92499c9706a035a49147a1071421da26e583aeb4&v=4",
    "https://avatars.githubusercontent.com/u/46404238?u=99db28ae1ed8647ba4d8af106d6b7205e98bf582&v=4",
    "https://avatars.githubusercontent.com/u/46683337?u=798b5997db3da807cbb55e056cb7df10fbc5928b&v=4",
    "https://avatars.githubusercontent.com/u/47569716?u=2ca7e7263aee9c0d5bb6326394b03a7cbe92dc6c&v=4",
    "https://avatars.githubusercontent.com/u/47910591?u=0bc7592fda5ce8fc10a1bea6db6b7d844d37a2e4&v=4",
    "https://avatars.githubusercontent.com/u/49815725?u=5ac41fd83a679d4a409d5f6dbd2e7bae605dbc07&v=4",
    "https://avatars.githubusercontent.com/u/50542095?u=ba25c9e0d4169aa2da37095bcb3d56477431c8fd&v=4",
    "https://avatars.githubusercontent.com/u/53945697?u=21d3b93d68c3a036512d1ab620d0bc9ca28b29d4&v=4",
    "https://avatars.githubusercontent.com/u/55510116?u=da71370ac5c655c4dca469c62b450369b5f17634&v=4",
    "https://avatars.githubusercontent.com/u/56691830?u=260931c9a903611f5693bee3ecfc240761cbfb6d&v=4",
    "https://avatars.githubusercontent.com/u/58008412?v=4",
    "https://avatars.githubusercontent.com/u/58097612?u=0b95d656de5156459a98b3d154eaa3ca5b429d46&v=4",
    "https://avatars.githubusercontent.com/u/58795684?u=85f94d3e24c28a0d663befb5c80eda16ea5d0509&v=4",
    "https://avatars.githubusercontent.com/u/58812660?u=745f5b6ff579beacc0c5beb7b11e03910c7066cf&v=4",
    "https://avatars.githubusercontent.com/u/59908257?u=b53331fddcb831db20f17f313cd3b3102f737611&v=4",
    "https://avatars.githubusercontent.com/u/61021151?u=5a4dc4d415626e3ef20e08329b7d5f5200a75c25&v=4",
    "https://avatars.githubusercontent.com/u/61100599?u=6270d50cf7b2eb65bf7b65bcd467bb02bde2c781&v=4",
    "https://avatars.githubusercontent.com/u/61147779?u=0e41219213df53c7b12e2a34b5b54e18bb22b2d1&v=4",
    "https://avatars.githubusercontent.com/u/61749447?u=e1a6ab3426854a4136c6491e9d8a3458309739fe&v=4",
    "https://avatars.githubusercontent.com/u/62889526?v=4",
    "https://avatars.githubusercontent.com/u/64465410?u=03635d5ab372ab4fc32e53f30cf39c8dbf445182&v=4",
    "https://avatars.githubusercontent.com/u/64470206?u=b06a37779deec7a74bca66643df6773a1015e33c&v=4",
    "https://avatars.githubusercontent.com/u/64765950?u=1940dde545601d019a7422a2fb869d8d29bbbc29&v=4",
    "https://avatars.githubusercontent.com/u/65048232?u=64c69beb24690dbc4dcf35b4ade64590df808829&v=4",
    "https://avatars.githubusercontent.com/u/65109978?u=342d42345a80fcbd7be306fbdc0b49b48e376809&v=4",
    "https://avatars.githubusercontent.com/u/65322202?v=4",
    "https://avatars.githubusercontent.com/u/66181235?v=4",
    "https://avatars.githubusercontent.com/u/66718093?v=4",
    "https://avatars.githubusercontent.com/u/67078432?u=28e7082d18aff424b1166b83b7f3fd14d375f99e&v=4",
    "https://avatars.githubusercontent.com/u/67723349?v=4",
    "https://avatars.githubusercontent.com/u/68189386?u=be357b7d48c2fc068844b146472a55fabf07c349&v=4",
    "https://avatars.githubusercontent.com/u/70983906?u=893ec51682fec564cbe151c1befecdf60d138c38&v=4",
    "https://avatars.githubusercontent.com/u/71186972?u=ab014e662a0b1f447575275f0827ffb0929b31a5&v=4",
    "https://avatars.githubusercontent.com/u/71205200?u=e6a0d8b039bdd1ec2832cfa85e80e7e87a9afcb5&v=4",
    "https://avatars.githubusercontent.com/u/71232944?u=cb91e5e4ef18f960e81d3e3e1bbb9bf30d3cf48b&v=4",
    "https://avatars.githubusercontent.com/u/71721378?u=c6313ec7ded857a471317891d6c04226154ff8bf&v=4",
    "https://avatars.githubusercontent.com/u/72387595?u=a97298f4a67ee593bfdad815d7c2d0213f2ccc3e&v=4",
    "https://avatars.githubusercontent.com/u/73305572?u=8ea777b44847c20b69f2e6a90bd0b6afdc7d5848&v=4",
    "https://avatars.githubusercontent.com/u/74512338?u=4463da0bbb1cb295608afc1d37d21dd83092f5ea&v=4",
    "https://avatars.githubusercontent.com/u/75092363?u=b463ff7a52ae969347e20f1ec10c04c72daad028&v=4",
    "https://avatars.githubusercontent.com/u/75194970?u=dcad4754f27071fd7703258ad59926ccdf301a41&v=4",
    "https://avatars.githubusercontent.com/u/76674797?u=f0f91318bf781e4f49fb34c2659ceabdf2c77204&v=4",
    "https://avatars.githubusercontent.com/u/77452312?v=4",
    "https://avatars.githubusercontent.com/u/78172343?v=4",
    "https://avatars.githubusercontent.com/u/78185467?u=849eb02196888141608723cb73424417eca04146&v=4",
    "https://avatars.githubusercontent.com/u/79320512?u=c020edd05e4d5ce2686d165ae0c7e3aa8ee2dd75&v=4",
    "https://avatars.githubusercontent.com/u/79810799?u=b72fcb529f27e212b21e268b9557fb548f668b69&v=4",
    "https://avatars.githubusercontent.com/u/80033705?u=bb784c7b4cb2d1f919eddb96230121ccc9830ea2&v=4",
    "https://avatars.githubusercontent.com/u/80219581?u=a57fc9693923c59db8e4130c6d1ee7784eb4db6e&v=4",
    "https://avatars.githubusercontent.com/u/81785867?v=4",
    "https://avatars.githubusercontent.com/u/81983357?u=574c8c268776afa5d784cf052f7d9123cd734491&v=4",
    "https://avatars.githubusercontent.com/u/82299965?u=5dd92667cb10318a6b58b7d42f17bdd31093c51f&v=4",
    "https://avatars.githubusercontent.com/u/82985536?u=759265841543ed02a53c4a83ff50d0486013db88&v=4",
    "https://avatars.githubusercontent.com/u/83424024?v=4",
    "https://avatars.githubusercontent.com/u/84086733?u=8eabd18ba583664f12ac46b31cb10138ce6017e1&v=4",
    "https://avatars.githubusercontent.com/u/85196642?u=6ea765e127d0993e4ef6976e6a2057a38211f328&v=4",
    "https://avatars.githubusercontent.com/u/85894862?u=5ecd10e768e0de19117d941706e58e64ed124a36&v=4",
    "https://avatars.githubusercontent.com/u/85945745?u=7e6698e84e55db68c70cfc7ac5fe801fc808867a&v=4",
    "https://avatars.githubusercontent.com/u/86011827?u=e04e455bf4626ae396eb61bbcf64a8ef67a73ee7&v=4",
    "https://avatars.githubusercontent.com/u/86074935?u=5afa94a1c1d457eb420f811e0687cf5c093fe157&v=4",
    "https://avatars.githubusercontent.com/u/86132148?u=624eb9149dafdc49550cae86c0f4962ab3ee043c&v=4",
    "https://avatars.githubusercontent.com/u/86934674?u=2dcc57f4717cb80481375d01b8ee4c1b41168b5d&v=4",
    "https://avatars.githubusercontent.com/u/88804146?u=dc6177158b645636ba9c024a82693f79768b82d2&v=4",
    "https://avatars.githubusercontent.com/u/88863223?u=b56633f1e8ac14645d649a3934ce15d5768b95e0&v=4",
    "https://avatars.githubusercontent.com/u/88881326?u=ab424927b800ac21d295252a22fb8d42f4d849d1&v=4",
    "https://avatars.githubusercontent.com/u/90285038?u=0f19d9648afdcae7d9a178a41c6479684c0ae298&v=4",
    "https://avatars.githubusercontent.com/u/91889051?u=2f2ef1c450541107bde119c5c42e3c7d95b18a16&v=4",
    "https://avatars.githubusercontent.com/u/92183497?u=01acca378f53fbc2df1c09883650b7e3715a809f&v=4",
    "https://avatars.githubusercontent.com/u/93847144?u=bcd68c780503ec9f4c7400bd9579a63b9fff5f48&v=4",
    "https://avatars.githubusercontent.com/u/93884352?v=4",
    "https://avatars.githubusercontent.com/u/96925398?u=0bc6345fbd7ab9c9bea40334ce0da572299f8fdd&v=4",
    "https://avatars.githubusercontent.com/u/97067423?u=43ede42d76cbaee0c5a0b0aa539f8c8a2bf9e4fa&v=4",
    "https://avatars.githubusercontent.com/u/98931660?u=757245bd0cb1a88dc6665d7cf2a954479e65a95e&v=4",
    "https://avatars.githubusercontent.com/u/98996720?v=4",
    "https://avatars.githubusercontent.com/u/100001126?v=4",
    "https://avatars.githubusercontent.com/u/101633295?u=9a9b6dd2afb5fefea7ea43c5d9671ffc6909162b&v=4",
    "https://avatars.githubusercontent.com/u/101976351?u=5b973e5db2fa9e948e9a80441daff75c20cc26c4&v=4",
    "https://avatars.githubusercontent.com/u/102361830?v=4",
    "https://avatars.githubusercontent.com/u/103445445?u=1d61fdc738a4158630799b74eba9a9291ce84989&v=4",
    "https://avatars.githubusercontent.com/u/103481051?u=fe3493ade94f1578ba5d438b9109ee77314723b4&v=4",
    "https://avatars.githubusercontent.com/u/104635394?u=4849169fdf9209758b777db9eb8e2d03a8249f20&v=4",
    "https://avatars.githubusercontent.com/u/106283053?u=f0092cb783d09d32772bafffd6641c1448c4fc83&v=4",
    "https://avatars.githubusercontent.com/u/108168631?u=f71282ca99174f272214b710952d807361c3fcb4&v=4",
    "https://avatars.githubusercontent.com/u/109773742?v=4",
    "https://avatars.githubusercontent.com/u/110563913?u=009b2a0edffcdc5a8ea1721bdc54398dd7210a16&v=4",
    "https://avatars.githubusercontent.com/u/110644614?u=d6d86e9f0fc441dd77faaaa1ea538bbfeccf65fd&v=4",
    "https://avatars.githubusercontent.com/u/110647626?u=f581753f44482991169131df4df68e0bff0185fd&v=4",
    "https://avatars.githubusercontent.com/u/112457115?v=4",
    "https://avatars.githubusercontent.com/u/112940984?u=88decb011919c0665677940caa7d4367697c78aa&v=4",
    "https://avatars.githubusercontent.com/u/113237296?u=e1ffeae8ab274351636ed40fd0b40abb99996b8c&v=4",
    "https://avatars.githubusercontent.com/u/113984460?u=7f27a1f117a4a72d339108319a8dde88c5d8a906&v=4",
    "https://avatars.githubusercontent.com/u/114883691?v=4",
    "https://avatars.githubusercontent.com/u/114953309?v=4",
    "https://avatars.githubusercontent.com/u/118023838?v=4",
    "https://avatars.githubusercontent.com/u/118934074?v=4",
    "https://avatars.githubusercontent.com/u/119067940?u=426128f6c4c7132e95ab88e488f023e9c37d3a91&v=4",
    "https://avatars.githubusercontent.com/u/120588147?v=4",
    "https://avatars.githubusercontent.com/u/121362170?u=38947e60be616ef95d74df1e39516db011057f78&v=4",
    "https://avatars.githubusercontent.com/u/122066880?v=4",
    "https://avatars.githubusercontent.com/u/122542765?v=4",
    "https://avatars.githubusercontent.com/u/124919681?u=9f58a80a88eaee6ffedda002d5bf818ec686d25d&v=4",
    "https://avatars.githubusercontent.com/u/126217153?v=4",
    "https://avatars.githubusercontent.com/u/126254038?u=66f26e21e311eacb65422d57dad9417eae766ece&v=4",
    "https://avatars.githubusercontent.com/u/126530755?v=4",
    "https://avatars.githubusercontent.com/u/129215465?u=bec8aa0627c1d3c512f080dab66f62f8f8ef41c5&v=4",
    "https://avatars.githubusercontent.com/u/129561353?u=5f6983d2289d6a132ff78115e6bcaa478cd23736&v=4",
    "https://avatars.githubusercontent.com/u/129572040?v=4",
    "https://avatars.githubusercontent.com/u/129763103?v=4",
    "https://avatars.githubusercontent.com/u/130724954?u=32f31e4fde4d2454b07347a603ec8f26abc65cc6&v=4",
    "https://avatars.githubusercontent.com/u/131174169?u=a29f24bc7c4d3144f8168db0626ad340d45d643a&v=4",
    "https://avatars.githubusercontent.com/u/131309538?v=4",
    "https://avatars.githubusercontent.com/u/134817009?u=b64bec33830f9e63499766411fc6942b4875e815&v=4",
    "https://avatars.githubusercontent.com/u/136415157?u=491c49205b4843d64c3f1f16e261d9c17f187630&v=4",
    "https://avatars.githubusercontent.com/u/137206444?u=4e5645bb7b86218528b88cfbc4c786710547febb&v=4",
    "https://avatars.githubusercontent.com/u/138394755?u=1df4ef79bbe004aa1d612a67a9107c01a7a891a3&v=4",
    "https://avatars.githubusercontent.com/u/139040371?v=4",
    "https://avatars.githubusercontent.com/u/139408731?u=8f66cbf0c6152bfe07c7eebda67caf7a5f4c163f&v=4",
    "https://avatars.githubusercontent.com/u/140089641?u=e15458e524e9ec7c7b2d48c8598bf21501f84ac4&v=4",
    "https://avatars.githubusercontent.com/u/140875641?v=4",
    "https://avatars.githubusercontent.com/u/140925340?u=40a7df29d0c337fe9033f3749a65ea423343572c&v=4",
    "https://avatars.githubusercontent.com/u/142821075?v=4",
    "https://avatars.githubusercontent.com/u/143452318?u=727ee21b3e19274c7faca76e915b9629fdac3d6f&v=4",
    "https://avatars.githubusercontent.com/u/143685267?v=4",
    "https://avatars.githubusercontent.com/u/143801584?u=9c72f50a1948c0cdefbedecceb74c2b2396be31f&v=4",
    "https://avatars.githubusercontent.com/u/143802502?u=7fce2bb164e8ef0730066b5654e68e108cab973e&v=4",
    "https://avatars.githubusercontent.com/u/144581033?u=6d419581750ef8b07ab2391224dc71d1f4c63561&v=4",
    "https://avatars.githubusercontent.com/u/145237333?v=4",
    "https://avatars.githubusercontent.com/u/145693414?u=a97a0c100f56dab39fbef7fabaed07d60206a71e&v=4",
    "https://avatars.githubusercontent.com/u/145878634?v=4",
    "https://avatars.githubusercontent.com/u/146647799?v=4",
    "https://avatars.githubusercontent.com/u/146695158?v=4",
    "https://avatars.githubusercontent.com/u/146696976?v=4",
    "https://avatars.githubusercontent.com/u/148315359?v=4",
    "https://avatars.githubusercontent.com/u/148689255?v=4",
    "https://avatars.githubusercontent.com/u/148775521?u=36cbbda476fa035738bc63e34191403bf420f1e8&v=4",
    "https://avatars.githubusercontent.com/u/148968450?u=7494dbfdd3f873ce6e496558c44cc953f4075abd&v=4",
    "https://avatars.githubusercontent.com/u/149020407?v=4",
    "https://avatars.githubusercontent.com/u/149024507?u=0c6f0fc0e47e5e1d130e8a23de70c6e8b238cd98&v=4",
    "https://avatars.githubusercontent.com/u/149044636?v=4",
    "https://avatars.githubusercontent.com/u/149220753?v=4",
    "https://avatars.githubusercontent.com/u/149317979?u=44734356e3a09ba53df143b28a01e27f13976626&v=4",
    "https://avatars.githubusercontent.com/u/149413926?v=4",
    "https://avatars.githubusercontent.com/u/149460575?u=c0e23d2342830423be1bdb48943575717b247ab7&v=4",
    "https://avatars.githubusercontent.com/u/149545559?v=4",
    "https://avatars.githubusercontent.com/u/149562018?u=755306517c6e358e9dddb0ace63be1284339a89f&v=4",
    "https://avatars.githubusercontent.com/u/149966018?v=4",
    "https://avatars.githubusercontent.com/u/150454771?v=4",
    "https://avatars.githubusercontent.com/u/150511396?v=4",
    "https://avatars.githubusercontent.com/u/150570938?v=4",
    "https://avatars.githubusercontent.com/u/150570938?v=4",
];
