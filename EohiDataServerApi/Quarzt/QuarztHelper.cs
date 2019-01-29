﻿
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Web;

namespace EohiDataServerApi
{
    public class QuarztHelper
    {
        public static IScheduler scheduler = null;
        private static log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        public static void Stop()
        {
            try
            {
                if (scheduler != null)
                {
                    //if (scheduler.IsStarted)
                    //{
                    scheduler.Shutdown();
                    string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "停止定时器，停止定时器");
                    log.Info(start);
                    //}
                }
                scheduler = null;
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), exp.Message);
                log.Info(start);
                Console.WriteLine(exp.Message);
                //throw;
            }
        }
        public static void Start()
        {
            try
            {
                if (scheduler != null)
                {
                    if (!scheduler.IsStarted)
                    {
                        scheduler.Shutdown();
                        string startg = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), " scheduler.Shutdown();");
                        log.Info(startg);
                    }
                }
                var properties = new NameValueCollection();
                //properties["quartz.scheduler.instanceName"] = "RemoteServerSchedulerClient";
                //properties["quartz.scheduler.instanceName"] = "RemoteServerSchedulerClient";
                //// 设置线程池
                //properties["quartz.threadPool.type"] = "Quartz.Simpl.SimpleThreadPool, Quartz";
                //properties["quartz.threadPool.threadCount"] = "5";
                //properties["quartz.threadPool.threadPriority"] = "Normal";
                // 远程输出配置
                properties["quartz.scheduler.exporter.type"] = "Quartz.Simpl.RemotingSchedulerExporter, Quartz";
                properties["quartz.scheduler.exporter.port"] = ConfigurationManager.AppSettings["CrystalQuartzPort"];//"559"; 
                properties["quartz.scheduler.exporter.bindName"] = "QuartzScheduler";
                properties["quartz.scheduler.exporter.channelType"] = "tcp";

                //scheduler = StdSchedulerFactory.GetDefaultScheduler(properties);
                var schedulerFactory = new StdSchedulerFactory(properties);
                scheduler = schedulerFactory.GetScheduler();
                scheduler.Start();
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "创建定时器，启动定时器");
                log.Info(start);
                //
                CreateHttpJobForModels();

                #region MyRegion
                //List<Models.Model_QuartzNetItem> itemList = QuartzNetService.GetList();
                //{
                //    foreach (Models.Model_QuartzNetItem itm in itemList)
                //    {
                //        if (itm.Quartzstatus != "启动")
                //        {
                //            continue;
                //        }
                //        else
                //        {
                //            JoinJob(itm.Id);
                //        }


                //        if (itm.Jobtype.ToLower() == "http")
                //        {
                //            HttpJob_Create(itm);
                //        }
                //    }
                //} 


                //加载;
                /*
                IJobDetail job = JobBuilder.Create<HttpRequestJob>().Build();

                ITrigger trigger = TriggerBuilder.Create()
                  .WithIdentity("triggerName", "groupName")
                  .WithSimpleSchedule(t =>
                    t.WithIntervalInSeconds(5)
                     .RepeatForever())
                     .Build();

                //
                scheduler.ScheduleJob(job, trigger);
                */
                #endregion
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), exp.Message);
                log.Info(start);
                Console.WriteLine(exp.Message);
                //throw;
            }
        }


        /// <summary>
        /// 绑定任务数据到任务 
        /// </summary>
        /// <returns></returns>
        public static string CreateHttpJobForModels()
        {
            try
            {
                if (scheduler != null && scheduler.IsStarted)
                {
                    scheduler.Clear();
                    List<Models.Model_QuartzNetItem> itemList = QuartzNetService.GetList();
                    {
                        foreach (Models.Model_QuartzNetItem itm in itemList)
                        {
                            if (itm.Quartzstatus != "启动")
                            {
                                continue;
                            }
                           JoinJob(itm.Id);
                        }
                    }
                    return "加载任务数据个数为："+itemList.Count.ToString();
                }
                return "0：暂无数据";
            }
            catch (Exception ex)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "CreateHttpJobForModels"+ex.Message);
                log.Info(start);
                return ex.Message;
            }
   
        }

        private static void HttpJob_Create(Models.Model_QuartzNetItem itm)
        {

            try
            {
                IJobDetail job = JobBuilder.Create<HttpRequestJob>()
               .WithIdentity("job-" + itm.Id.ToString())
               .WithDescription(itm.Quartzname + "|" + itm.Quartznote)
               .UsingJobData("httpurl", itm.Jobpars)
               .Build();

                //ITrigger trigger = TriggerBuilder.Create()
                //  .WithIdentity("trigger" + itm.Id.ToString(), "triggergroup" + itm.Id.ToString())
                //  .WithSimpleSchedule(t =>
                //    t.WithIntervalInSeconds(5)
                //     .RepeatForever())
                //     .Build();

                ITrigger trigger = TriggerBuilder.Create()
                                   .WithIdentity("trigger-" + itm.Id.ToString())
                                   .StartNow()
                                   .WithCronSchedule(itm.Crontrigger)    //时间表达式，5秒一次     
                                   .Build();

                //
                scheduler.ScheduleJob(job, trigger);

                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "创建 HttpJob"+itm.Id+","+itm.Quartzname+","+itm.Quartznote+","+itm.Quartzstatus);
                log.Info(start);
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "创建 HttpJob" + itm.Id + "," + itm.Quartzname + "," + itm.Quartznote + "," + itm.Quartzstatus+exp.Message);
                log.Info(start);
                //throw;
            }
        }
        private static void HttpJob_Remove(Models.Model_QuartzNetItem itm)
        {
            try
            {
                string jobid = "job-" + itm.Id.ToString();
                string triggerid = "trigger-" + itm.Id.ToString();
                JobKey jobKey = new JobKey(jobid);
                TriggerKey triggerKey = new TriggerKey(triggerid);
                scheduler.PauseJob(jobKey);// 停止触发器  
                scheduler.UnscheduleJob(triggerKey);// 移除触发器  
                scheduler.DeleteJob(jobKey);// 删除任务  
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "创建 HttpJob" + itm.Id + "," + itm.Quartzname + "," + itm.Quartznote + "," + itm.Quartzstatus+exp.Message);
                log.Info(start);
                //throw;
            }
        }

        public static void JoinJob(int jobid)
        {
            try
            {
                Models.Model_QuartzNetItem itm = QuartzNetService.GetById(jobid);
                if (itm == null)
                    return;
                if (itm.Jobtype.ToLower() == "http")
                {
                    if (itm.Quartzstatus == "停止")
                    {
                        string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "移除任务 HttpJob" + itm.Id + "," + itm.Quartzname + "," + itm.Quartznote + "," + itm.Quartzstatus);
                        log.Info(start);
                        //移除
                        HttpJob_Remove(itm);
                       
                    }
                    else
                    {
                        string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "开始创建 HttpJob" + itm.Id + "," + itm.Quartzname + "," + itm.Quartznote + "," + itm.Quartzstatus);
                        log.Info(start);
                        HttpJob_Create(itm);
                         start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "创建成功 HttpJob" + itm.Id + "," + itm.Quartzname + "," + itm.Quartznote + "," + itm.Quartzstatus);
                        log.Info(start);
                    }
                }

            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "JoinJob" + exp.Message);
                log.Info(start);
                //throw;
            }
        }

        public static void RemoveJob(int id)
        {
            try
            {
                Models.Model_QuartzNetItem itm = QuartzNetService.GetById(id);
                if (itm == null)
                    return;
                string jobid = "job-" + itm.Id.ToString();
                string triggerid = "trigger-" + itm.Id.ToString();
                JobKey jobKey = new JobKey(jobid);
                TriggerKey triggerKey = new TriggerKey(triggerid);
                scheduler.PauseJob(jobKey);// 停止触发器  
                scheduler.UnscheduleJob(triggerKey);// 移除触发器  
                scheduler.DeleteJob(jobKey);// 删除任务  
            }
            catch (Exception exp)
            {
                string start = string.Format("{0}-{1}", DateTime.Now.ToString("yyyyMMddHHmmss"), "RemoveJob"+ exp.Message);
                log.Info(start);
                //throw;
            }
        }
    }
}