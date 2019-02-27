import { API, BaseClient } from '@sentry/core/esm';
import { logger } from '@sentry/utils/esm/logger';
import { getGlobalObject } from '@sentry/utils/esm/misc';
import { BrowserBackend } from './backend';
import { SDK_NAME, SDK_VERSION } from './version';
/**
 * The Sentry Browser SDK Client.
 *
 * @see BrowserOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export class BrowserClient extends BaseClient {
    /**
     * Creates a new Browser SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    constructor(options) {
        super(BrowserBackend, options);
    }
    /**
     * @inheritDoc
     */
    async prepareEvent(event, scope, hint) {
        event.platform = event.platform || 'javascript';
        event.sdk = {
            ...event.sdk,
            name: SDK_NAME,
            packages: [
                ...((event.sdk && event.sdk.packages) || []),
                {
                    name: 'npm:@sentry/browser',
                    version: SDK_VERSION,
                },
            ],
            version: SDK_VERSION,
        };
        return super.prepareEvent(event, scope, hint);
    }
    /**
     * Show a report dialog to the user to send feedback to a specific event.
     *
     * @param options Set individual options for the dialog
     */
    showReportDialog(options = {}) {
        // doesn't work without a document (React Native)
        const document = getGlobalObject().document;
        if (!document) {
            return;
        }
        if (!this.isEnabled()) {
            logger.error('Trying to call showReportDialog with Sentry Client is disabled');
            return;
        }
        const dsn = options.dsn || this.getDsn();
        if (!options.eventId) {
            logger.error('Missing `eventId` option in showReportDialog call');
            return;
        }
        if (!dsn) {
            logger.error('Missing `Dsn` option in showReportDialog call');
            return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.src = new API(dsn).getReportDialogEndpoint(options);
        (document.head || document.body).appendChild(script);
    }
}
//# sourceMappingURL=client.js.map