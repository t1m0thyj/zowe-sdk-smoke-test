import { IProfile, Session, Logger, LoggingConfigurer, TextUtils, ImperativeError,
    CredentialManagerFactory } from "@zowe/imperative";
import { ZosmfSession } from "@zowe/zosmf-for-zowe-sdk";
import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { explainPublishedTemplatesFull, explainPublishedTemplatesSummary, ListCatalogTemplates,
    IPublishedTemplates, ProvisioningConstants } from "@zowe/provisioning-for-zowe-sdk";

(async () => {
    //Initialize the Imperative Credential Manager Factory and Logger
    Logger.initLogger(LoggingConfigurer.configureLogger('lib', {name: 'test'}));
    // Uncommment the below line if the Secure Credential Store is in use
    // await CredentialManagerFactory.initialize({service: "Zowe-Plugin"});

    // Get the default z/OSMF profile and create a z/OSMF session with it
    let defaultZosmfProfile: IProfile;
    try {
        defaultZosmfProfile = await getDefaultProfile("zosmf", true);
    } catch (err) {
        throw new ImperativeError({msg: "Failed to get a profile."});
    }

    const session: Session = ZosmfSession.createBasicZosmfSession(defaultZosmfProfile);
    const templates: IPublishedTemplates = await ListCatalogTemplates.listCatalogCommon(session,
    ProvisioningConstants.ZOSMF_VERSION);

    let prettifiedTemplates: any = {};
    if (process.argv.slice(2).includes("--all") || process.argv.slice(2).includes("-a")) {
        prettifiedTemplates = TextUtils.explainObject(templates, explainPublishedTemplatesFull, true);
    } else {
        prettifiedTemplates = TextUtils.explainObject(templates, explainPublishedTemplatesSummary, false);
    }
    let response = "z/OSMF Service Catalog templates\n";
    response = response + TextUtils.prettyJson(prettifiedTemplates);
    console.log(response);
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
