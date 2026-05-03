"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const resilience_1 = require("../resilience");
const resilience_2 = require("../resilience");
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
class SafeSupabaseClient {
    constructor(url, key) {
        this.supabaseClient = (0, supabase_js_1.createClient)(url, key);
    }
    async query(operation) {
        return resilience_1.circuitBreaker.execute(async () => {
            return (0, resilience_2.withRetry)(async () => {
                const { data, error } = await operation();
                if (error) {
                    throw error;
                }
                return data;
            }, { maxAttempts: 3, initialDelay: 500 });
        });
    }
    getClient() {
        return this.supabaseClient;
    }
    from(table) {
        return this.supabaseClient.from(table);
    }
}
exports.supabase = new SafeSupabaseClient(supabaseUrl, supabaseKey);
//# sourceMappingURL=supabase.js.map