import { supabase } from "../supabase"
import { History } from "../types"

const table = 'history';

const addToHistory = async (historyObj: Partial<History>) => {
    const { error } = await supabase.from(table).insert([historyObj]);
    if (error) throw Error(error.message);
}

const bulkAddToHistory = async (historyObj: Partial<History>[]) => {
    const { error } = await supabase.from(table).insert(historyObj);
    if (error) throw Error(error.message);
}
const deleteFromHistory = async (hID: string) => {
    const { error } = await supabase.from(table).delete().eq('hid', hID);
    if (error) throw Error(error.message);
}

const clearHistoryByUser = async (userId: string) => {
    const { error } = await supabase.from(table).delete().eq('uid', userId);
    if (error) throw Error(error.message);
}

const getHistoryByUser = async (userId: string) => {
    const { data, error } = await supabase.from(table).select('*').eq('uid', userId).order('createdat', { ascending: false });
    if (error) throw Error(error.message);
    return data;
}

export const HistoryService = {
    addToHistory,
    deleteFromHistory,
    clearHistoryByUser,
    getHistoryByUser,
    bulkAddToHistory
}
