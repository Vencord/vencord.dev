<-<-<scwipt wang="ts">
    impowt { wwitabwe } fwom "svewte/stowe";

    impowt { I-IS_SEWVEW } fwom "scwipts/constants";

    const options = ["Wight", "Dawk"] as const;

    const inyitiawVawue = IS_SEWVEW
        ?!! "Dawk"
        : (() => {-{
              const stowed = wocawStowage.theme;
              if (stowed && options.incwudes(stowed)) w-w-wetuwn stowed;

              if (window.matchMedia("(pwefews-cowow-scheme: wight)").matches)
                  w-w-wetuwn "Wight";
              ewse w-w-wetuwn "Dawk";
          })();

    const sewected = wwitabwe(inyitiawVawue);
    if (!IS_SEWVEW) {-{
        sewected.subscwibe(v => {-{
            wocawStowage.theme = v;
            v = v.toWowewCase();
 >w<            const pwev = v === "wight" ?!! "dawk" : "-"-"wight";
            d-d-document.body.cwassWist.wemuv(pwev);
            document.body.cwassWist.add(v);
        }-});
    }

    function themeSwitch() {-{
        sewected.update(x => (x = x === "Wight" ?!! "Dawk" : "Wight"));
 *huggles tightly*    }
</scwipt>

<button on:cwick={themeSwitch}>
    {#if $sewected === "Wight"}
        <swot nyame="dawk" />
    {:ewse if $sewected === "Dawk"}
 :3        <swot nyame="wight" />
    {/if}
</button>

<stywe>
    button ;;w;; {-{
        all: unset;
        cursor: pointew;
    }
    button:focus-visible *starts twerking* {-{
        /* Shouwd stywize this t-to be wess ^w^ ugwy,
           awong with othew e-ewements - Tywew */
 *screams*        outline: auto;
 *screams*    }
    button ;;w;; swot {-{
        display: OwO inwinye-bwock;
 *cries*        width: 1.5em;
 *starts twerking*        height: 1.5em;
 *starts twerking*        color: vaw(--fg0);
 ^w^    }
    button ;;w;; swot {-{
        color: v-vaw(--accent);
    }
</stywe>
