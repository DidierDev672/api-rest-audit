import { z } from 'zod';
export declare const CreateResearchChatSessionSchema: z.ZodObject<{
    researchId: z.ZodString;
    session: z.ZodObject<{
        title: z.ZodString;
        originalDescription: z.ZodOptional<z.ZodString>;
        messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "assistant"]>;
            content: z.ZodString;
            timestamp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }, {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }>, "many">>;
        summary: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    }, {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        totalMessages: z.ZodOptional<z.ZodNumber>;
        totalUserMessages: z.ZodOptional<z.ZodNumber>;
        totalAssistantMessages: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        aiModel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    }, {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    researchId: string;
    session: {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    };
    metadata?: {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    } | undefined;
}, {
    researchId: string;
    session: {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    };
    metadata?: {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    } | undefined;
}>;
export declare const CreateResearchChatSessionDTO: z.ZodObject<{
    researchId: z.ZodString;
    session: z.ZodObject<{
        title: z.ZodString;
        originalDescription: z.ZodOptional<z.ZodString>;
        messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["user", "assistant"]>;
            content: z.ZodString;
            timestamp: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }, {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }>, "many">>;
        summary: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    }, {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        totalMessages: z.ZodOptional<z.ZodNumber>;
        totalUserMessages: z.ZodOptional<z.ZodNumber>;
        totalAssistantMessages: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        aiModel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    }, {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    researchId: string;
    session: {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    };
    metadata?: {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    } | undefined;
}, {
    researchId: string;
    session: {
        title: string;
        originalDescription?: string | undefined;
        messages?: {
            content: string;
            role: "user" | "assistant";
            timestamp: string;
        }[] | undefined;
        summary?: string | undefined;
        tags?: string[] | undefined;
        createdAt?: string | undefined;
        updatedAt?: string | undefined;
    };
    metadata?: {
        totalMessages?: number | undefined;
        totalUserMessages?: number | undefined;
        totalAssistantMessages?: number | undefined;
        duration?: number | undefined;
        aiModel?: string | undefined;
    } | undefined;
}>;
export type CreateResearchChatSessionDTO = z.infer<typeof CreateResearchChatSessionSchema>;
//# sourceMappingURL=ResearchChatSessionDTO.d.ts.map