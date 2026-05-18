import { z } from 'zod';
export declare const N8nSendTextSchema: z.ZodObject<{
    text: z.ZodEffects<z.ZodString, string, string>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const N8nReceiveTextSchema: z.ZodObject<{
    text: z.ZodEffects<z.ZodString, string, string>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const N8nReceiveGeminiSchema: z.ZodObject<{
    task: z.ZodString;
    gemini_response: z.ZodObject<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>;
    timestamp: z.ZodOptional<z.ZodString>;
    filename: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    task: string;
    gemini_response: {
        content: {
            parts: z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">[];
            role?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        finishReason?: string | undefined;
        index?: number | undefined;
    } & {
        [k: string]: unknown;
    };
    timestamp?: string | undefined;
    filename?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    task: string;
    gemini_response: {
        content: {
            parts: z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">[];
            role?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        finishReason?: string | undefined;
        index?: number | undefined;
    } & {
        [k: string]: unknown;
    };
    timestamp?: string | undefined;
    filename?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const N8nMarkdownUploadSchema: z.ZodObject<{
    filename: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    content: string;
    filename: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    content: string;
    filename: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const N8nReceivePayloadSchema: z.ZodEffects<z.ZodUnion<[z.ZodObject<{
    task: z.ZodString;
    gemini_response: z.ZodObject<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        content: z.ZodObject<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            parts: z.ZodArray<z.ZodObject<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>, "many">;
            role: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
        finishReason: z.ZodOptional<z.ZodString>;
        index: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>;
    timestamp: z.ZodOptional<z.ZodString>;
    filename: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    task: string;
    gemini_response: {
        content: {
            parts: z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">[];
            role?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        finishReason?: string | undefined;
        index?: number | undefined;
    } & {
        [k: string]: unknown;
    };
    timestamp?: string | undefined;
    filename?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    task: string;
    gemini_response: {
        content: {
            parts: z.objectInputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">[];
            role?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        finishReason?: string | undefined;
        index?: number | undefined;
    } & {
        [k: string]: unknown;
    };
    timestamp?: string | undefined;
    filename?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    filename: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    content: string;
    filename: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    content: string;
    filename: string;
    metadata?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    text: z.ZodEffects<z.ZodString, string, string>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
}>]>, {
    text: string;
    metadata?: Record<string, unknown> | undefined;
} | {
    task: string;
    gemini_response: {
        content: {
            parts: z.objectOutputType<{
                text: z.ZodOptional<z.ZodString>;
                thoughtSignature: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">[];
            role?: string | undefined;
        } & {
            [k: string]: unknown;
        };
        finishReason?: string | undefined;
        index?: number | undefined;
    } & {
        [k: string]: unknown;
    };
    timestamp?: string | undefined;
    filename?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
} | {
    content: string;
    filename: string;
    metadata?: Record<string, unknown> | undefined;
}, unknown>;
export type N8nSendTextDTO = z.infer<typeof N8nSendTextSchema>;
export type N8nReceiveTextDTO = z.infer<typeof N8nReceiveTextSchema>;
export type N8nReceiveGeminiDTO = z.infer<typeof N8nReceiveGeminiSchema>;
export type N8nMarkdownUploadDTO = z.infer<typeof N8nMarkdownUploadSchema>;
export type N8nReceivePayloadDTO = z.infer<typeof N8nReceivePayloadSchema>;
//# sourceMappingURL=N8nTextDTO.d.ts.map